import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Star,
  Edit,
  Save,
  X,
  RotateCcw,
  Shield,
  ImageIcon,
  Video,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/utils/helpers/classNames";
import type { MovieDetailProps } from "./MovieDetail.types";
import { moviesAPI, type Movie } from "@/api/movies.api";
import { Button, Loading, Alert, Badge, Card, Textarea } from "@/components/ui";
import Image from "@/components/ui/Image";
import Chip from "@/components/ui/Chip";
import { useAppSelector } from "@/store/hooks";
import { isAdmin } from "@/utils/permissions";
import {
  EncodingProgress,
  type ThumbnailSize,
  type VideoQuality,
  ThumbnailGallery,
  type ThumbnailItem,
  VideoQualitySelector,
  type VideoQualityItem,
} from "./components";

// Extended Movie interface for admin management
interface ExtendedMovie extends Omit<Movie, "genre"> {
  genres: string[];
}

// Available categories for selection
const AVAILABLE_CATEGORIES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
  "Cyberpunk",
  "Superhero",
  "Sports",
];

// Mock data for when API is not working - Extended with categories
const getMockMovie = (id: string): ExtendedMovie => {
  const movies: ExtendedMovie[] = [
    {
      id: 1,
      title: "The Quantum Odyssey",
      description:
        "A mind-bending sci-fi thriller that explores the boundaries of reality and quantum physics. When a brilliant physicist discovers a way to manipulate quantum states, she must navigate through multiple dimensions to save the universe.",
      releaseDate: "2024-03-15",
      genres: ["Science Fiction", "Thriller", "Adventure"],
      rating: 8.7,
      duration: 148,
      posterUrl:
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Crimson Valley",
      description:
        "A gripping western drama set in 1880s Arizona. A lone gunslinger seeks revenge against the corrupt sheriff who destroyed his family, uncovering a conspiracy that reaches the highest levels of government.",
      releaseDate: "2024-01-20",
      genres: ["Western", "Drama", "Action"],
      rating: 9.1,
      duration: 126,
      posterUrl:
        "https://images.unsplash.com/photo-1489599735946-114fee923d34?w=400&h=600&fit=crop",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Digital Dreams",
      description:
        "In a near-future world where consciousness can be uploaded to digital realms, a programmer discovers that someone is trapping souls in a virtual prison. A cyberpunk thriller about identity and freedom.",
      releaseDate: "2024-05-10",
      genres: ["Cyberpunk", "Thriller", "Science Fiction"],
      rating: 8.3,
      duration: 134,
      posterUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const found = movies.find((m) => m.id === parseInt(id));
  if (found) return found;
  // Always return the first movie as fallback - we know it exists
  return movies[0]!;
};

// File Upload Component
const FileUploadArea: React.FC<{
  label: string;
  icon: React.ReactNode;
  accept: string;
  currentFile?: string;
  onFileSelect: (file: File) => void;
  className?: string;
}> = ({ label, icon, accept, currentFile, onFileSelect, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer",
        "hover:border-primary hover:bg-primary/5 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className,
      )}
      onClick={handleClick}
      tabIndex={0}
      role="button"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label={label}
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-muted-foreground">{icon}</div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {currentFile && (
          <div className="text-xs text-muted-foreground">
            Current: {currentFile}
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Click to upload or drag and drop
        </div>
      </div>
    </div>
  );
};

// Category Selector Component
const CategorySelector: React.FC<{
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  isEditing: boolean;
}> = ({ selectedCategories, onCategoriesChange, isEditing }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const removeCategory = (category: string) => {
    onCategoriesChange(selectedCategories.filter((c) => c !== category));
  };

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  if (!isEditing) {
    return (
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <Chip key={category} variant="primary" size="sm">
            {category}
          </Chip>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <Chip
            key={category}
            variant="primary"
            size="sm"
            onRemove={() => removeCategory(category)}
          >
            {category}
          </Chip>
        ))}
      </div>

      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full justify-start"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
            {AVAILABLE_CATEGORIES.filter(
              (cat) => !selectedCategories.includes(cat),
            ).map((category) => (
              <button
                key={category}
                className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground text-sm"
                onClick={() => {
                  addCategory(category);
                  setShowDropdown(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MovieDetail: React.FC<MovieDetailProps> = ({ children, className }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  // Check if user can edit
  const canEdit = isAdmin(user);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Try to get data from API, fallback to mock data
  const { data: apiMovie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => moviesAPI.getMovie(Number(id)),
    enabled: !!id,
    retry: false,
  });

  // Convert API movie to extended format
  const originalMovie: ExtendedMovie | null = React.useMemo(() => {
    if (apiMovie) {
      return {
        ...apiMovie,
        genres: [apiMovie.genre], // Convert single genre to array
      };
    }
    return id ? getMockMovie(id) : null;
  }, [apiMovie, id]);

  // Editable movie state
  const [editedMovie, setEditedMovie] = useState<ExtendedMovie | null>(
    originalMovie,
  );

  // File upload states
  const [selectedPosterFile, setSelectedPosterFile] = useState<File | null>(
    null,
  );
  const [selectedTrailerFile, setSelectedTrailerFile] = useState<File | null>(
    null,
  );

  // Encoding states (mock data for UI demonstration)
  const [posterUploadProgress, setPosterUploadProgress] = useState(0);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [showPosterEncoding, setShowPosterEncoding] = useState(false);
  const [showVideoEncoding, setShowVideoEncoding] = useState(false);

  // Mock thumbnail sizes for image encoding
  const [thumbnailSizes, setThumbnailSizes] = useState<ThumbnailSize[]>([
    { name: "Original", size: "1920x1080", progress: 100, status: "completed" },
    { name: "Large", size: "1280x720", progress: 85, status: "encoding" },
    { name: "Medium", size: "640x360", progress: 45, status: "encoding" },
    { name: "Small", size: "320x180", progress: 0, status: "pending" },
    { name: "Thumbnail", size: "160x90", progress: 0, status: "pending" },
  ]);

  // Mock video qualities for video encoding
  const [videoQualities, setVideoQualities] = useState<VideoQuality[]>([
    {
      name: "2K",
      resolution: "2560x1440",
      bitrate: "8 Mbps",
      progress: 100,
      status: "completed",
    },
    {
      name: "1080p",
      resolution: "1920x1080",
      bitrate: "5 Mbps",
      progress: 75,
      status: "encoding",
    },
    {
      name: "720p",
      resolution: "1280x720",
      bitrate: "2.5 Mbps",
      progress: 30,
      status: "encoding",
    },
    {
      name: "360p",
      resolution: "640x360",
      bitrate: "1 Mbps",
      progress: 0,
      status: "pending",
    },
  ]);

  // Mock generated thumbnails for view mode (all thumbnails available)
  // Using real Unsplash URLs with different sizes for testing
  const generatedThumbnails: ThumbnailItem[] = editedMovie ? [
    {
      name: "Original",
      size: "1920x1080",
      url: editedMovie.posterUrl || "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
      fileSize: "2.4 MB",
      isGenerated: true,
    },
    {
      name: "Large",
      size: "1280x720",
      url: editedMovie.posterUrl ? `${editedMovie.posterUrl}?w=1280&h=720&fit=crop` : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1280&h=720&fit=crop",
      fileSize: "980 KB",
      isGenerated: true,
    },
    {
      name: "Medium",
      size: "640x360",
      url: editedMovie.posterUrl ? `${editedMovie.posterUrl}?w=640&h=360&fit=crop` : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=640&h=360&fit=crop",
      fileSize: "320 KB",
      isGenerated: true,
    },
    {
      name: "Small",
      size: "320x180",
      url: editedMovie.posterUrl ? `${editedMovie.posterUrl}?w=320&h=180&fit=crop` : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=320&h=180&fit=crop",
      fileSize: "95 KB",
      isGenerated: true,
    },
    {
      name: "Thumbnail",
      size: "160x90",
      url: editedMovie.posterUrl ? `${editedMovie.posterUrl}?w=160&h=90&fit=crop` : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=160&h=90&fit=crop",
      fileSize: "28 KB",
      isGenerated: true,
    },
  ] : [];

  // Mock generated video qualities for view mode (all qualities available)
  const generatedVideoQualities: VideoQualityItem[] = editedMovie ? [
    {
      name: "2K",
      resolution: "2560x1440",
      bitrate: "8 Mbps",
      url: editedMovie.trailerUrl || "",
      fileSize: "450 MB",
      isGenerated: true,
      recommendedFor: "Best for large screens & 4K displays",
    },
    {
      name: "1080p",
      resolution: "1920x1080",
      bitrate: "5 Mbps",
      url: editedMovie.trailerUrl || "",
      fileSize: "280 MB",
      isGenerated: true,
      recommendedFor: "Recommended for HD displays",
    },
    {
      name: "720p",
      resolution: "1280x720",
      bitrate: "2.5 Mbps",
      url: editedMovie.trailerUrl || "",
      fileSize: "140 MB",
      isGenerated: true,
      recommendedFor: "Good for laptops & tablets",
    },
    {
      name: "360p",
      resolution: "640x360",
      bitrate: "1 Mbps",
      url: editedMovie.trailerUrl || "",
      fileSize: "56 MB",
      isGenerated: true,
      recommendedFor: "Best for mobile & slow connections",
    },
  ] : [];

  React.useEffect(() => {
    if (originalMovie && !editedMovie) {
      setEditedMovie(originalMovie);
    }
  }, [originalMovie, editedMovie]);

  if (isLoading && !originalMovie) {
    return (
      <div className={cn("p-6", className)}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex justify-center items-center min-h-96">
          <Loading size="lg" />
        </div>
      </div>
    );
  }

  if (!editedMovie || !originalMovie) {
    return (
      <div className={cn("p-6", className)}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Alert variant="danger">
          <div>
            <h3 className="font-semibold">Movie Not Found</h3>
            <p className="text-sm mt-1">
              The movie you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </Alert>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 fill-current text-warning" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-5 w-5 fill-current text-warning opacity-50"
        />,
      );
    }

    const emptyStars = 10 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground" />,
      );
    }

    return stars;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make API calls to save the changes
    console.log("Saving movie changes:", {
      movie: editedMovie,
      posterFile: selectedPosterFile,
      trailerFile: selectedTrailerFile,
    });

    // Simulate poster upload and encoding
    if (selectedPosterFile) {
      simulatePosterUpload();
    }

    // Simulate video upload and encoding
    if (selectedTrailerFile) {
      simulateVideoUpload();
    }

    setIsEditing(false);
    setHasChanges(false);

    // Show success notification
    alert("Movie upload started! Check encoding progress below.");
  };

  // Simulate poster S3 upload and thumbnail generation
  const simulatePosterUpload = () => {
    setShowPosterEncoding(true);
    setPosterUploadProgress(0);

    // Simulate S3 upload progress
    const uploadInterval = setInterval(() => {
      setPosterUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          // Start thumbnail encoding simulation after upload
          simulateThumbnailEncoding();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Simulate thumbnail encoding for different sizes
  const simulateThumbnailEncoding = () => {
    // Reset thumbnails
    setThumbnailSizes([
      { name: "Original", size: "1920x1080", progress: 0, status: "encoding" },
      { name: "Large", size: "1280x720", progress: 0, status: "pending" },
      { name: "Medium", size: "640x360", progress: 0, status: "pending" },
      { name: "Small", size: "320x180", progress: 0, status: "pending" },
      { name: "Thumbnail", size: "160x90", progress: 0, status: "pending" },
    ]);

    // Encode thumbnails sequentially
    encodeThumbnailSequentially(0);
  };

  const encodeThumbnailSequentially = (index: number) => {
    if (index >= 5) return;

    // Update current thumbnail to encoding
    setThumbnailSizes((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, status: "encoding" as const } : t,
      ),
    );

    const interval = setInterval(() => {
      setThumbnailSizes((prev) =>
        prev.map((t, i) => {
          if (i === index && t.progress < 100) {
            return { ...t, progress: Math.min(t.progress + 20, 100) };
          }
          return t;
        }),
      );
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setThumbnailSizes((prev) =>
        prev.map((t, i) =>
          i === index
            ? { ...t, progress: 100, status: "completed" as const }
            : t,
        ),
      );
      // Start next thumbnail
      setTimeout(() => encodeThumbnailSequentially(index + 1), 500);
    }, 1800);
  };

  // Simulate video S3 upload and multi-resolution encoding
  const simulateVideoUpload = () => {
    setShowVideoEncoding(true);
    setVideoUploadProgress(0);

    // Simulate S3 upload progress
    const uploadInterval = setInterval(() => {
      setVideoUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          // Start video encoding simulation after upload
          simulateVideoEncoding();
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  // Simulate video encoding for multiple resolutions
  const simulateVideoEncoding = () => {
    // Reset qualities
    setVideoQualities([
      {
        name: "2K",
        resolution: "2560x1440",
        bitrate: "8 Mbps",
        progress: 0,
        status: "encoding",
      },
      {
        name: "1080p",
        resolution: "1920x1080",
        bitrate: "5 Mbps",
        progress: 0,
        status: "pending",
      },
      {
        name: "720p",
        resolution: "1280x720",
        bitrate: "2.5 Mbps",
        progress: 0,
        status: "pending",
      },
      {
        name: "360p",
        resolution: "640x360",
        bitrate: "1 Mbps",
        progress: 0,
        status: "pending",
      },
    ]);

    // Encode qualities in parallel (different speeds for realism)
    encodeQualityInParallel();
  };

  const encodeQualityInParallel = () => {
    const speeds = [15, 12, 18, 25]; // Different encoding speeds for each quality

    speeds.forEach((speed, index) => {
      setVideoQualities((prev) =>
        prev.map((q, i) =>
          i === index ? { ...q, status: "encoding" as const } : q,
        ),
      );

      const interval = setInterval(() => {
        setVideoQualities((prev) =>
          prev.map((q, i) => {
            if (i === index && q.progress < 100) {
              return { ...q, progress: Math.min(q.progress + speed, 100) };
            }
            return q;
          }),
        );
      }, 500);

      // Complete after progress reaches 100
      setTimeout(
        () => {
          clearInterval(interval);
          setVideoQualities((prev) =>
            prev.map((q, i) =>
              i === index
                ? { ...q, progress: 100, status: "completed" as const }
                : q,
            ),
          );
        },
        (100 / speed) * 500 + 500,
      );
    });
  };

  const handleCancel = () => {
    setEditedMovie(originalMovie);
    setIsEditing(false);
    setHasChanges(false);
    setSelectedPosterFile(null);
    setSelectedTrailerFile(null);
  };

  const handleReset = () => {
    setEditedMovie(originalMovie);
    setHasChanges(false);
    setSelectedPosterFile(null);
    setSelectedTrailerFile(null);
  };

  const updateMovie = (field: keyof ExtendedMovie, value: any) => {
    setEditedMovie((prev) => (prev ? { ...prev, [field]: value } : null));
    setHasChanges(true);
  };

  return (
    <div className={cn("p-6 space-y-6", className)}>
      {/* Header with navigation and admin controls */}
      <EncodingProgress
        type="image"
        uploadProgress={100}
        thumbnails={[
          {
            name: "Original",
            size: "1920x1080",
            progress: 100,
            status: "completed",
          },
          { name: "Large", size: "1280x720", progress: 85, status: "encoding" },
          { name: "Medium", size: "640x360", progress: 45, status: "encoding" },
          { name: "Small", size: "320x180", progress: 0, status: "pending" },
          { name: "Thumbnail", size: "160x90", progress: 0, status: "pending" },
        ]}
      />
      <EncodingProgress
        type="video"
        uploadProgress={100}
        qualities={[
          {
            name: "2K",
            resolution: "2560x1440",
            bitrate: "8 Mbps",
            progress: 100,
            status: "completed",
          },
          {
            name: "1080p",
            resolution: "1920x1080",
            bitrate: "5 Mbps",
            progress: 75,
            status: "encoding",
          },
          {
            name: "720p",
            resolution: "1280x720",
            bitrate: "2.5 Mbps",
            progress: 30,
            status: "encoding",
          },
          {
            name: "360p",
            resolution: "640x360",
            bitrate: "1 Mbps",
            progress: 0,
            status: "pending",
          },
        ]}
      />
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="focus-ring"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>

        {canEdit && (
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="focus-ring"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="focus-ring"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="bg-success hover:bg-success/90 focus-ring"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={handleEdit}
                className="bg-primary hover:bg-primary/90 focus-ring"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Movie
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Admin indicator */}
      {canEdit && (
        <Alert variant="info" className="border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4" />
          <div>
            <h4 className="font-semibold">Admin Mode</h4>
            <p className="text-sm">
              You have permission to edit this movie's information.
            </p>
          </div>
        </Alert>
      )}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <div className="relative">
            {isEditing ? (
              <div className="space-y-4">
                <FileUploadArea
                  label="Upload Movie Poster"
                  icon={<ImageIcon className="h-8 w-8" />}
                  accept="image/*"
                  currentFile={selectedPosterFile?.name || "Current poster"}
                  onFileSelect={setSelectedPosterFile}
                  className="w-full max-w-sm aspect-[2/3]"
                />
                {(selectedPosterFile || editedMovie.posterUrl) && (
                  <Image
                    src={
                      selectedPosterFile
                        ? URL.createObjectURL(selectedPosterFile)
                        : editedMovie.posterUrl
                    }
                    alt={editedMovie.title}
                    className="w-full max-w-sm rounded-lg shadow-default-color shadow-lg object-cover aspect-[2/3] border border-border"
                    placeholder="movie"
                  />
                )}
              </div>
            ) : (
              <Image
                src={editedMovie.posterUrl}
                alt={editedMovie.title}
                className="w-full max-w-sm rounded-lg shadow-default-color shadow-lg object-cover aspect-[2/3] border border-border"
                placeholder="movie"
              />
            )}

            {/* Floating badge for rating */}
            <div className="absolute top-4 right-4">
              <Badge
                variant="secondary"
                className="glass text-foreground font-semibold text-lg px-3 py-1"
              >
                <Star className="h-4 w-4 fill-current text-warning mr-1" />
                {editedMovie.rating}
              </Badge>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedMovie.title}
                onChange={(e) => updateMovie("title", e.target.value)}
                className="text-4xl lg:text-5xl font-bold border-none bg-transparent p-0 focus:outline-none focus:ring-0 gradient-text w-full"
                placeholder="Movie Title"
              />
            ) : (
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground gradient-text mb-2">
                {editedMovie.title}
              </h1>
            )}

            {/* Description */}
            {isEditing ? (
              <Textarea
                value={editedMovie.description}
                onChange={(e) => updateMovie("description", e.target.value)}
                className="text-lg italic leading-relaxed bg-transparent border-none p-0 focus:ring-0 resize-none"
                placeholder="Movie description..."
                rows={3}
              />
            ) : (
              editedMovie.description && (
                <p className="text-lg text-muted-foreground italic leading-relaxed">
                  {editedMovie.description}
                </p>
              )
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1">
                <Calendar className="h-4 w-4 text-primary" />
                {isEditing ? (
                  <input
                    type="date"
                    value={editedMovie.releaseDate}
                    onChange={(e) => updateMovie("releaseDate", e.target.value)}
                    className="border-none bg-transparent p-0 h-auto focus:outline-none focus:ring-0 text-sm"
                  />
                ) : (
                  <span className="font-medium">
                    {new Date(editedMovie.releaseDate).getFullYear()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1">
                <Clock className="h-4 w-4 text-primary" />
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={editedMovie.duration}
                      onChange={(e) =>
                        updateMovie("duration", parseInt(e.target.value) || 0)
                      }
                      className="border-none bg-transparent p-0 h-auto focus:outline-none focus:ring-0 text-sm w-16"
                      placeholder="120"
                    />
                    <span className="text-xs">min</span>
                  </div>
                ) : (
                  <span className="font-medium">
                    {formatDuration(editedMovie.duration)}
                  </span>
                )}
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1">
                  <Star className="h-4 w-4 text-warning" />
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={0.1}
                    value={editedMovie.rating}
                    onChange={(e) =>
                      updateMovie("rating", parseFloat(e.target.value) || 0)
                    }
                    className="border-none bg-transparent p-0 h-auto focus:outline-none focus:ring-0 text-sm w-12"
                  />
                  <span className="text-xs">/10</span>
                </div>
              )}
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Categories
              </h3>
              <CategorySelector
                selectedCategories={editedMovie.genres}
                onCategoriesChange={(categories) =>
                  updateMovie("genres", categories)
                }
                isEditing={isEditing}
              />
            </div>
          </div>

          {/* Rating (view mode) */}
          {!isEditing && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {renderStars(editedMovie.rating)}
              </div>
              <span className="text-xl font-semibold text-foreground">
                {editedMovie.rating}/10
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Poster Encoding Progress */}
          {showPosterEncoding && (
            <EncodingProgress
              type="image"
              uploadProgress={posterUploadProgress}
              thumbnails={thumbnailSizes}
            />
          )}

          {/* Video Encoding Progress */}
          {showVideoEncoding && (
            <EncodingProgress
              type="video"
              uploadProgress={videoUploadProgress}
              qualities={videoQualities}
            />
          )}

          {/* Thumbnail Gallery - View Mode Only */}
          {!isEditing && !showPosterEncoding && editedMovie.posterUrl && (
            <ThumbnailGallery
              posterUrl={editedMovie.posterUrl}
              thumbnails={generatedThumbnails}
            />
          )}

          {/* Video Quality Selector - View Mode Only */}
          {!isEditing && !showVideoEncoding && editedMovie.trailerUrl && (
            <VideoQualitySelector qualities={generatedVideoQualities} />
          )}

          {/* Trailer Section */}
          <Card className="glass border-border shadow-default-color shadow-md">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Trailer
              </h2>

              {isEditing ? (
                <div className="space-y-4">
                  <FileUploadArea
                    label="Upload Trailer Video"
                    icon={<Video className="h-8 w-8" />}
                    accept="video/*"
                    currentFile={selectedTrailerFile?.name || "Current trailer"}
                    onFileSelect={setSelectedTrailerFile}
                    className="aspect-video"
                  />
                  {editedMovie.trailerUrl && !selectedTrailerFile && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-secondary/20 border border-border">
                      <iframe
                        src={editedMovie.trailerUrl}
                        title={`${editedMovie.title} Trailer`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              ) : (
                editedMovie.trailerUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-secondary/20 border border-border">
                    <iframe
                      src={editedMovie.trailerUrl}
                      title={`${editedMovie.title} Trailer`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Movie Details Card */}
          <Card className="glass border-border shadow-default-color shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                Movie Details
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="font-medium text-muted-foreground">
                    Categories:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {editedMovie.genres.slice(0, 2).map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-primary/10 text-primary text-xs"
                      >
                        {genre}
                      </Badge>
                    ))}
                    {editedMovie.genres.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary text-xs"
                      >
                        +{editedMovie.genres.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="font-medium text-muted-foreground">
                    Duration:
                  </span>
                  <span className="text-foreground">
                    {formatDuration(editedMovie.duration)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="font-medium text-muted-foreground">
                    Release Date:
                  </span>
                  <span className="text-foreground">
                    {new Date(editedMovie.releaseDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="font-medium text-muted-foreground">
                    Rating:
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-warning" />
                    <span className="text-foreground font-medium">
                      {editedMovie.rating}/10
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-muted-foreground">
                    Movie ID:
                  </span>
                  <span className="text-foreground font-mono">
                    #{editedMovie.id}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          {canEdit && !isEditing && (
            <Card className="glass border-border shadow-default-color shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full"></div>
                  Admin Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="w-full justify-start focus-ring hover:bg-primary/5"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Movie Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start focus-ring hover:bg-danger/5 text-danger border-danger/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Movie
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default MovieDetail;

