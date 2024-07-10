import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileContainer from '../components/FileContainer';

export default function Home() {
  const [files, setFiles] = useState([]);

  const handleFilesUploaded = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <FileUpload onFilesUploaded={handleFilesUploaded} />
      <div className="flex flex-wrap">
        {files.map((file, index) => (
          <FileContainer 
            key={index} 
            file={file} 
            onClose={() => handleRemoveFile(file)} 
          />
        ))}
      </div>
    </div>
  );
}
