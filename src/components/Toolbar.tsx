import React from 'react';
import { Square, Circle, Trash2, Settings, Download, Upload, Save, Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { ToolbarProps } from '../lib/types';

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddSquare,
  onAddCircle,
  onClearPanels,
  onToggleCanvasSettings,
  onExportToPNG,
  onExportConfig,
  onImportConfig,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1
        className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        Layout Designer
      </h1>
      <div className="flex gap-4">
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <button
            onClick={onAddSquare}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
            aria-label="Add Square Panel"
          >
            <Square size={20} />
          </button>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Add Square Panel
          </span>
        </div>
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <button
            onClick={onAddCircle}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white transition-colors`}
            aria-label="Add Circle Panel"
          >
            <Circle size={20} />
          </button>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Add Circle Panel
          </span>
        </div>
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <button
            onClick={onExportConfig}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
            aria-label="Save Configuration"
          >
            <Save size={20} />
          </button>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Save Configuration
          </span>
        </div>
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <label
            htmlFor="upload-config"
            className={`p-2 rounded-lg inline-flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            <Upload size={20} />
            <input
              id="upload-config"
              type="file"
              accept=".json"
              onChange={onImportConfig}
              className="hidden"
              aria-label="Upload Configuration"
            />
          </label>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Upload Configuration
          </span>
        </div>
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <button
            onClick={onExportToPNG}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-purple-500 hover:bg-purple-600'
            } text-white transition-colors`}
            aria-label="Export to PNG"
          >
            <Download size={20} />
          </button>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Export to PNG
          </span>
        </div>
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <button
            onClick={onToggleCanvasSettings}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-gray-500 hover:bg-gray-600'
            } text-white transition-colors`}
            aria-label="Toggle Canvas Settings"
          >
            <Settings size={20} />
          </button>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Canvas Settings
          </span>
        </div>
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <button
            onClick={onClearPanels}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors`}
            aria-label="Clear Panels"
          >
            <Trash2 size={20} />
          </button>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Clear Panels
          </span>
        </div>
        <div className="relative group cursor-[url(pointer.svg),_pointer]">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <span
            className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 z-50 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Switch to {theme === 'dark' ? 'light' : 'dark'} theme
          </span>
        </div>
      </div>
    </div>
  );
};