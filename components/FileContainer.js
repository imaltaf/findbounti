import { useState, useEffect } from 'react';
import { FiCopy, FiX } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function FileContainer({ file, onClose }) {
  const [subdomains, setSubdomains] = useState([]);
  const [filteredSubdomains, setFilteredSubdomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const subdomainList = content.split('\n').filter(Boolean);
      setSubdomains(subdomainList);
      setFilteredSubdomains(subdomainList);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    readFile(file);
  }, [file]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredSubdomains(
      subdomains.filter((subdomain) =>
        subdomain.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative border border-neon-green p-4 m-2 bg-white bg-opacity-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{file.name}</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm pl-3 text-gray-500">
            {filteredSubdomains.length} counts
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-2 py-1 text-sm border border-gray-300 rounded"
          />
          <button onClick={onClose} className="text-red-500">
            x
          </button>
        </div>
      </div>
      <div className="h-48 overflow-y-auto">
        {filteredSubdomains.map((subdomain, index) => (
          <div key={index} className="flex items-center justify-between mb-1">
            <a
              href={`http://${subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {subdomain}
            </a>
            <CopyToClipboard text={subdomain} onCopy={handleCopy}>
              <button className="text-gray-500 pr-5 hover:text-green-700">
                <FiCopy className="w-4 h-4" />
              </button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
      {copied && (
        <div className="absolute bottom-4 left-4 right-4 bg-gray-800 text-white p-2 rounded shadow-lg flex items-center justify-between">
          <span>Copied to clipboard!</span>
          <button onClick={() => setCopied(false)} className="text-white">
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
