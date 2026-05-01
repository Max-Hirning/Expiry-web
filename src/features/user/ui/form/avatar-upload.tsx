'use client';

import { DragEvent, FC, useEffect, useRef, useState } from 'react';

import { Camera, Trash2, Upload, X } from 'lucide-react';

import { cn } from 'shared/lib';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  UserAvatar,
} from 'shared/ui';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg'];

interface IAvatarUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  avatarUrl?: string;
  fullName: string;
  onDeleteAvatar?: () => void;
}

export const AvatarUpload: FC<IAvatarUploadProps> = ({
  value,
  onChange,
  avatarUrl,
  fullName,
  onDeleteAvatar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);

      return;
    }
    const url = URL.createObjectURL(value);

    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFileSelect = (file: File | undefined) => {
    if (!file || !ACCEPTED_TYPES.includes(file.type)) {
      return;
    }
    onChange(file);
  };

  const triggerFileInput = () => {
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  const handleCancel = () => onChange(undefined);

  const handleDelete = () => {
    onChange(undefined);
    onDeleteAvatar?.();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileSelect(event.dataTransfer.files?.[0]);
  };

  const imageUrl = previewUrl ?? avatarUrl;

  return (
    <div
      className="relative size-32"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UserAvatar
        classNameFallback="text-xl"
        className={cn(
          'size-32 border border-border',
          isDragging && 'ring-2 ring-primary',
        )}
        avatar={
          imageUrl
            ? {
                url: imageUrl,
              }
            : null
        }
        fullName={fullName}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="absolute right-0 top-[4px] size-9 rounded-full shadow-sm"
          >
            <Camera size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={triggerFileInput}>
            <Upload size={16} className="mr-2" />
            Upload photo
          </DropdownMenuItem>
          {value && (
            <DropdownMenuItem onSelect={handleCancel}>
              <X size={16} className="mr-2" />
              Cancel
            </DropdownMenuItem>
          )}
          {avatarUrl && (
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={handleDelete}
            >
              <Trash2 size={16} className="mr-2" />
              Delete photo
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={event => handleFileSelect(event.target.files?.[0])}
      />
    </div>
  );
};
