'use client'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
    imageUrl: string;
    onFieldChange: (url: string) => void;
    setFiles: Dispatch<SetStateAction<File[]>>;
}
 
const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined
  });
 
  return (
    <div {...getRootProps()} className='flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50'>
      <input {...getInputProps()} className='cursor-pointer' />
      <div>
        {imageUrl ? (
            <div className='flex h-full w-full flex-1 justify-center'>
                <img
                    src={imageUrl}
                    alt='image'
                    width={250}
                    height={250}
                    className='w-full object-cover object-center'
                />
            </div>
        ) : (
            <div className='flex-center flex-col py-5 text-grey-500'>
                <img
                    src='/assets/icons/upload.svg'
                    width={77}
                    height={77}
                    alt='file upload'
                />
                <h3 className=''>Drag photo here</h3>
                <p className=''>SVG, PNG, JPG</p>
                <Button type='button' className=''>
                    Select from computer
                </Button>
            </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader