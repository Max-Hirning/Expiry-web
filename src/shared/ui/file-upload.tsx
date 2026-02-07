// 'use client';

// import { FC, useRef, useState } from 'react';

// import Image from 'next/image';

// import { Upload } from 'lucide-react';

// import { Button, Card, CardContent, CardFooter, CardHeader } from './shadcn';

// interface IProps extends Pick<HTMLInputElement, 'accept' | 'multiple'> {
//   description?: string;
//   maxSize?: number;
//   value: File[];
//   withPreview?: boolean;
//   onChange: (files: File[]) => void;
// }

// export const FileUpload: FC<IProps> = ({
//   description,
//   onChange,
//   multiple,
//   value,
//   withPreview,
//   maxSize,
//   accept,
// }) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [files, setFiles] = useState<Record<string, File>>({});

//   return (
//     <>
//       <Card>
//         {value.map(file => (
//           <Image
//             key={file.name}
//             alt={file.name}
//             src={URL.createObjectURL(file)}
//             fill
//             className="object-cover"
//           />
//         ))}
//       </Card>
//       <Card className="flex flex-col gap-4 border border-dashed border-input px-3 py-4">
//         <CardHeader className="flex w-full items-center justify-center p-0">
//           <Upload size={20} />
//         </CardHeader>
//         <CardContent className="flex flex-col items-center gap-2 p-0 text-sm">
//           <p>Choose a file or drag & drop it here</p>
//           <p className="text-[#71717A]">
//             {description || 'JPEG, PNG formats, up to 5 MB, 1:1 aspect ratio'}
//           </p>
//         </CardContent>
//         <CardFooter className="flex w-full justify-center p-0">
//           <Button
//             onClick={() => fileInputRef.current?.click()}
//             type="button"
//             variant="outline"
//             className="h-9 w-28"
//           >
//             Browse files
//           </Button>
//         </CardFooter>
//       </Card>
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept={accept}
//         multiple={multiple}
//         className="hidden"
//         onChange={event => {
//           const acceptArr = accept.split(',');

//           Array.from(event.target.files || []).forEach(file => {
//             if (!acceptArr.includes(file.type)) {
//               console.warn(`${file.name} has invalid type: ${file.type}`);

//               return;
//             }

//             if (maxSize && file.size > maxSize) {
//               console.warn(`${file.name} is too large: ${file.size}`);

//               return;
//             }

//             console.log(file);

//             setFiles(state => ({
//               ...state,
//               [file.name]: file,
//             }));
//           });

//           console.log('files', files)

//           onChange(Object.values(files));
//         }}
//       />
//     </>
//   );
// };

// 'use client';

// import { FC, useRef, useState } from 'react';

// import Image from 'next/image';

// import { File, Upload } from 'lucide-react';

// import {
//   Button,
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   Progress,
// } from './shadcn';
// import { cn } from 'shared/lib';

// interface IProps extends Pick<HTMLInputElement, 'accept' | 'multiple'> {
//   description?: string;
//   maxSize?: number;
//   value: File[];
//   withPreview?: boolean;
//   onChange: (files: File[]) => void;
// }

// interface FileWithProgress {
//   file: File;
//   progress: number;
// }

// export const FileUpload: FC<IProps> = ({
//   description,
//   onChange,
//   multiple,
//   value,
//   withPreview = true,
//   maxSize = 5 * 1024 * 1024, // 5 MB default
//   accept = 'image/jpeg,image/png',
// }) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [filesWithProgress, setFilesWithProgress] = useState<
//     FileWithProgress[]
//   >([]);

//   const handleFiles = (selectedFiles: File[]) => {
//     const validFiles: FileWithProgress[] = [];

//     selectedFiles.forEach(file => {
//       // Validate type
//       const acceptArr = accept.split(',').map(a => a.trim());

//       if (!acceptArr.includes(file.type)) {
//         console.warn(`${file.name} has invalid type: ${file.type}`);

//         return;
//       }

//       // Validate size
//       if (maxSize && file.size > maxSize) {
//         console.warn(`${file.name} is too large: ${file.size}`);

//         return;
//       }

//       validFiles.push({ file, progress: 0 });
//     });

//     if (!validFiles.length) {
//       return;
//     }

//     const newFiles = multiple
//       ? [...filesWithProgress, ...validFiles]
//       : validFiles;

//     setFilesWithProgress(newFiles);

//     // Fake progress
//     newFiles.forEach((f, index) => {
//       const interval = setInterval(() => {
//         setFilesWithProgress(prev =>
//           prev.map((fp, idx) =>
//             idx === index
//               ? { ...fp, progress: Math.min(fp.progress + 10, 100) }
//               : fp,
//           ),
//         );
//       }, 100);

//       // Clear interval when done
//       setTimeout(() => clearInterval(interval), 1100);
//     });

//     // Update parent form once all files are valid
//     onChange(newFiles.map(f => f.file));
//   };

//   return (
//     <>
//       {withPreview && filesWithProgress.length > 0 && (
//         <Card className="mb-4 flex flex-wrap gap-2 p-2">
//           {filesWithProgress.map(({ file, progress }) => (
//             <div
//               key={file.name}
//               className="relative h-24 w-24 overflow-hidden rounded border"
//             >
//               <Image
//                 alt={file.name}
//                 src={URL.createObjectURL(file)}
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute bottom-0 left-0 h-4 w-full bg-black/40">
//                 <div
//                   className="h-full bg-blue-500"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </Card>
//       )}

//       <Card className={cn("flex flex-col gap-4 border border-dashed border-input px-3 py-4 min-h-40", filesWithProgress.length > 0 && "justify-center")}>
//         {filesWithProgress.length > 0 ? (
//           filesWithProgress.map(({ file, progress }) => (
//             <div key={file.name} className='flex flex-col gap-4'>
//               <div className="flex items-center gap-2">
//                 <File className='text-[#71717A]' size={20} />
//                 <span className="flex-1">{file.name}</span>
//                 {progress}%
//               </div>
//               <Progress className='h-1' value={progress} />
//             </div>
//           ))
//         ) : (
//           <>
//             <CardHeader className="flex w-full items-center justify-center p-0">
//               <Upload size={20} />
//             </CardHeader>
//             <CardContent className="flex flex-col items-center gap-2 p-0 text-sm">
//               <p>Choose a file or drag & drop it here</p>
//               <p className="text-[#71717A]">
//                 {description ||
//                   'JPEG, PNG formats, up to 5 MB, 1:1 aspect ratio'}
//               </p>
//             </CardContent>
//             <CardFooter className="flex w-full justify-center p-0">
//               <Button
//                 onClick={() => fileInputRef.current?.click()}
//                 type="button"
//                 variant="outline"
//                 className="h-9 w-28"
//               >
//                 Browse files
//               </Button>
//             </CardFooter>
//           </>
//         )}
//       </Card>

//       <input
//         ref={fileInputRef}
//         type="file"
//         accept={accept}
//         multiple={multiple}
//         className="hidden"
//         onChange={event => {
//           const selectedFiles = Array.from(event.target.files || []);

//           handleFiles(selectedFiles);
//         }}
//       />
//     </>
//   );
// };

// 'use client';

// import { FC, useRef, useState } from 'react';

// import Image from 'next/image';

// import { File, Upload, X } from 'lucide-react';

// import { cn } from 'shared/lib';

// import {
//   Button,
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   Progress,
// } from './shadcn';

// interface IProps extends Pick<HTMLInputElement, 'accept' | 'multiple'> {
//   description?: string;
//   maxSize?: number;
//   value: File[];
//   withPreview?: boolean;
//   onChange: (files: File[]) => void;
// }

// interface FileWithProgress {
//   file: File;
//   progress: number;
// }

// export const FileUpload: FC<IProps> = ({
//   description,
//   onChange,
//   multiple,
//   value,
//   withPreview = true,
//   maxSize = 5 * 1024 * 1024, // 5 MB default
//   accept = 'image/jpeg,image/png',
// }) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [filesWithProgress, setFilesWithProgress] = useState<
//     FileWithProgress[]
//   >([]);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

//   const handleFiles = (selectedFiles: File[]) => {
//     const validFiles: FileWithProgress[] = [];

//     selectedFiles.forEach(file => {
//       // Validate type
//       const acceptArr = accept.split(',').map(a => a.trim());

//       if (!acceptArr.includes(file.type)) {
//         console.warn(`${file.name} has invalid type: ${file.type}`);

//         return;
//       }

//       // Validate size
//       if (maxSize && file.size > maxSize) {
//         console.warn(`${file.name} is too large: ${file.size}`);

//         return;
//       }

//       validFiles.push({ file, progress: 0 });
//     });

//     if (!validFiles.length) {
//       return;
//     }

//     const newFiles = multiple
//       ? [...filesWithProgress, ...validFiles]
//       : validFiles;

//     setFilesWithProgress(newFiles);

//     // Fake upload progress
//     newFiles.forEach((_, index) => {
//       const interval = setInterval(() => {
//         setFilesWithProgress(prev =>
//           prev.map((fp, idx) => {
//             if (idx === index) {
//               const nextProgress = Math.min(fp.progress + 10, 100);

//               return { ...fp, progress: nextProgress };
//             }

//             return fp;
//           }),
//         );
//       }, 100);

//       setTimeout(() => {
//         clearInterval(interval);

//         // Once progress reaches 100%, update uploadedFiles
//         setFilesWithProgress(prev => {
//           const allDone = prev.every(f => f.progress === 100);

//           if (allDone) {
//             const finishedFiles = prev.map(f => f.file);

//             setUploadedFiles(finishedFiles);
//             onChange(finishedFiles); // update parent
//           }

//           return prev;
//         });
//       }, 1100);
//     });
//   };

//   return (
//     <>
//       {/* Show previews only after upload complete */}
//       {withPreview && uploadedFiles.length > 0 && (
//         <>
//           {uploadedFiles.map(file => (
//             <div
//               key={file.name}
//               className="relative h-32 w-32 overflow-hidden rounded border border-input"
//             >
//               <Image
//                 alt={file.name}
//                 src={URL.createObjectURL(file)}
//                 fill
//                 className="object-cover"
//               />
//               <Button
//                 variant="outline"
//                 className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full"
//               >
//                 <X size={16} />
//               </Button>
//             </div>
//           ))}
//         </>
//       )}

//       <Card
//         className={cn(
//           'flex min-h-40 flex-col gap-4 border border-dashed border-input px-3 py-4',
//           filesWithProgress.length > 0 && 'justify-center',
//           uploadedFiles.length > 0 && 'hidden',
//         )}
//       >
//         {filesWithProgress.length > 0 ? (
//           filesWithProgress.map(({ file, progress }) => (
//             <div key={file.name} className="flex flex-col gap-2">
//               <div className="flex items-center gap-2">
//                 <File className="text-[#71717A]" size={20} />
//                 <span className="flex-1">{file.name}</span>
//                 {progress}%
//               </div>
//               <Progress className="h-1" value={progress} />
//             </div>
//           ))
//         ) : (
//           <>
//             <CardHeader className="flex w-full items-center justify-center p-0">
//               <Upload size={20} />
//             </CardHeader>
//             <CardContent className="flex flex-col items-center gap-2 p-0 text-sm">
//               <p>Choose a file or drag & drop it here</p>
//               <p className="text-[#71717A]">
//                 {description ||
//                   'JPEG, PNG formats, up to 5 MB, 1:1 aspect ratio'}
//               </p>
//             </CardContent>
//             <CardFooter className="flex w-full justify-center p-0">
//               <Button
//                 onClick={() => fileInputRef.current?.click()}
//                 type="button"
//                 variant="outline"
//                 className="h-9 w-28"
//               >
//                 Browse files
//               </Button>
//             </CardFooter>
//           </>
//         )}
//       </Card>

//       <input
//         ref={fileInputRef}
//         type="file"
//         accept={accept}
//         multiple={multiple}
//         className="hidden"
//         onChange={event => {
//           const selectedFiles = Array.from(event.target.files || []);

//           handleFiles(selectedFiles);
//         }}
//       />
//     </>
//   );
// };

'use client';

import { DragEvent, FC, useRef, useState } from 'react';

import Image from 'next/image';

import { File, Upload, X } from 'lucide-react';

import { cn } from 'shared/lib';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Progress,
} from './shadcn';

interface IProps extends Pick<HTMLInputElement, 'accept' | 'multiple'> {
  description?: string;
  maxSize?: number;
  value: File[];
  withPreview?: boolean;
  onChange: (files: File[]) => void;
}

interface FileWithProgress {
  file: File;
  progress: number;
}

const BYTES = 1024;

export const FileUpload: FC<IProps> = ({
  description,
  onChange,
  multiple,
  value,
  withPreview = true,
  maxSize = 5 * BYTES * BYTES, // 5 MB default
  accept = 'image/jpeg,image/png',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filesWithProgress, setFilesWithProgress] = useState<
    FileWithProgress[]
  >([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag events
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files || []);

    handleFiles(droppedFiles);
  };

  const handleFiles = (selectedFiles: File[]) => {
    const validFiles: FileWithProgress[] = [];

    selectedFiles.forEach(file => {
      const acceptArr = accept.split(',').map(a => a.trim());

      if (!acceptArr.includes(file.type)) {
        console.warn(`${file.name} has invalid type: ${file.type}`);

        return;
      }
      if (maxSize && file.size > maxSize) {
        console.warn(`${file.name} is too large: ${file.size}`);

        return;
      }
      validFiles.push({ file, progress: 0 });
    });

    if (!validFiles.length) {
      return;
    }

    const newFiles = multiple
      ? [...filesWithProgress, ...validFiles]
      : validFiles;

    setFilesWithProgress(newFiles);

    // Fake upload progress
    newFiles.forEach((_, index) => {
      const interval = setInterval(() => {
        setFilesWithProgress(prev =>
          prev.map((fp, idx) => {
            if (idx === index) {
              const nextProgress = Math.min(fp.progress + 10, 100);

              return { ...fp, progress: nextProgress };
            }

            return fp;
          }),
        );
      }, 100);

      setTimeout(() => {
        clearInterval(interval);

        setFilesWithProgress(prev => {
          const allDone = prev.every(f => f.progress === 100);

          if (!allDone) {
            return prev;
          }

          const finishedFiles = prev.map(f => f.file);

          setUploadedFiles(finishedFiles);
          onChange(finishedFiles);

          // 🔥 ВАЖНО: убираем прогресс после завершения
          return [];
        });
      }, 1100);
    });
  };

  return (
    <>
      {withPreview && uploadedFiles.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {uploadedFiles.map(file => (
            <div
              key={file.name}
              className="relative h-32 w-32 overflow-hidden rounded border border-input"
            >
              <Image
                alt={file.name}
                src={URL.createObjectURL(file)}
                fill
                className="object-cover"
              />
              <Button
                variant="outline"
                className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full"
                onClick={() => {
                  const filtered = uploadedFiles.filter(f => f !== file);

                  setUploadedFiles(filtered);
                  onChange(filtered);
                }}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'flex min-h-40 flex-col gap-4 border border-dashed border-input px-3 py-4 transition-colors',
          filesWithProgress.length > 0 && 'justify-center',
          uploadedFiles.length > 0 && 'hidden',
          isDragging && 'border-blue-500 bg-blue-50',
        )}
      >
        {filesWithProgress.length > 0 ? (
          filesWithProgress.map(({ file, progress }) => (
            <div key={file.name} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <File className="text-[#71717A]" size={20} />
                <span className="flex-1">{file.name}</span>
                {progress}%
              </div>
              <Progress
                className="h-1 [&>div]:bg-[linear-gradient(180deg,rgba(255,56,187,0.8)_0%,rgba(255,128,56,0.8)_33%,rgba(237,194,121,0.95)_67%,rgba(241,255,247,1)_100%)]"
                value={progress}
              />
            </div>
          ))
        ) : (
          <>
            <CardHeader className="flex w-full items-center justify-center p-0">
              <Upload size={20} />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2 p-0 text-sm">
              <p>Choose a file or drag & drop it here</p>
              <p className="text-[#71717A]">
                {description ||
                  'JPEG, PNG formats, up to 5 MB, 1:1 aspect ratio'}
              </p>
            </CardContent>
            <CardFooter className="flex w-full justify-center p-0">
              <Button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                variant="outline"
                className="h-9 w-28"
              >
                Browse files
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={event => handleFiles(Array.from(event.target.files || []))}
      />
    </>
  );
};
