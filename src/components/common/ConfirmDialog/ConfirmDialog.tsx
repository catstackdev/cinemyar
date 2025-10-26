import { useState } from "react";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import type { ConfirmDialogProps } from "./ConfirmDialog.types";

const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("Confirm action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const icons = {
    danger: <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />,
    warning: <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
    info: <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    default: null,
  };

  const confirmColors = {
    danger: "danger" as const,
    warning: "warning" as const,
    info: "info" as const,
    default: "primary" as const,
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          {icons[variant] && (
            <div className="mb-4 flex justify-center">{icons[variant]}</div>
          )}
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>

        {children && <ModalBody>{children}</ModalBody>}

        <ModalFooter>
          <Button
            onClick={handleCancel}
            variant="outline"
            disabled={loading || isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            color={confirmColors[variant]}
            isLoading={loading || isLoading}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
};

export default ConfirmDialog;
