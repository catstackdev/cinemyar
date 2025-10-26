import type { Meta, StoryObj } from "@storybook/react-vite";
import Image from "./Image";

const meta = {
  title: "Components/UI/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    fit: {
      control: "select",
      options: ["cover", "contain", "fill", "none", "scale-down"],
    },
    aspectRatio: {
      control: "select",
      options: ["square", "video", "auto"],
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800",
    alt: "Sample cat image",
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://invalid-url-that-will-fail.com/image.jpg",
    alt: "Broken image with fallback",
    fallback: "https://via.placeholder.com/400x300?text=Fallback+Image",
  },
};

export const AspectRatios: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800",
    alt: "Sample image",
  },
  render: () => (
    <div className="grid gap-4">
      <div className="w-64">
        <p className="mb-2 text-sm font-medium">Square</p>
        <Image
          src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800"
          alt="Square aspect ratio"
          aspectRatio="square"
        />
      </div>
      <div className="w-64">
        <p className="mb-2 text-sm font-medium">Video (16:9)</p>
        <Image
          src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800"
          alt="Video aspect ratio"
          aspectRatio="video"
        />
      </div>
    </div>
  ),
};

export const ObjectFit: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800",
    alt: "Sample image",
  },
  render: () => (
    <div className="grid gap-4">
      <div className="h-48 w-64 bg-gray-100">
        <p className="mb-2 text-sm font-medium">Cover</p>
        <Image
          src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800"
          alt="Cover fit"
          fit="cover"
          className="h-full w-full"
        />
      </div>
      <div className="h-48 w-64 bg-gray-100">
        <p className="mb-2 text-sm font-medium">Contain</p>
        <Image
          src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800"
          alt="Contain fit"
          fit="contain"
          className="h-full w-full"
        />
      </div>
    </div>
  ),
};
