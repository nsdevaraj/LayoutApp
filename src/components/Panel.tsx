import React, { useState, useCallback } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { Trash2, Move } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { PanelProps } from '../lib/types';

export const Panel: React.FC<PanelProps> = ({
  id,
  x,
  y,
  width,
  height,
  zIndex,
  title,
  isCircle,
  isSelected,
  isCtrlPressed,
  moveMode,
  roundedCorners,
  onDragStop,
  onResize,
  onRemove,
  onSelect,
  onToggleMoveMode,
  onTitleChange,
}) => {
  const { theme } = useTheme();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleDragStop = useCallback(
    (_e: DraggableEvent, data: DraggableData) => {
      onDragStop(id, data);
    },
    [id, onDragStop]
  );

  const handleTitleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onTitleChange(id, newTitle);
      setIsEditingTitle(false);
    },
    [id, newTitle, onTitleChange]
  );

  const handleResize = useCallback(
    (_e: React.SyntheticEvent, { size, handle }: { size: { width: number; height: number }; handle: string }) => {
      const newSize = isCircle ? { width: Math.max(size.width, size.height), height: Math.max(size.width, size.height) } : size;
      onResize(id, newSize, handle);
    },
    [id, isCircle, onResize]
  );

  return (
    <Draggable
      position={{ x, y }}
      onStop={handleDragStop}
      bounds="parent"
      grid={[10, 10]}
      disabled={!isCtrlPressed && !moveMode}
    >
      <div
        className={`absolute ${isSelected ? 'z-10' : 'z-0'}`}
        style={{ zIndex }}
        onClick={() => onSelect(id)}
      >
        <ResizableBox
          width={width}
          height={height}
          resizeHandles={['s', 'e', 'n', 'w', 'ne', 'nw', 'se', 'sw']}
          minConstraints={[200, 200]}
          draggableOpts={{ grid: [10, 10] }}
          onResizeStart={() => moveMode && onToggleMoveMode()}
          onResize={handleResize}
        >
          <div className="relative group">
            <div className="handle-icon absolute bottom-0 right-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15L15 21M21 8L8 21"
                  stroke="rgb(209 213 219)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`${isCircle ? 'rounded-full' : roundedCorners ? 'rounded-lg' : ''} ${
                isSelected || moveMode
                  ? 'z-10 border-2 border-indigo-700'
                  : 'z-0 border-2 group-hover:border-blue-400'
              } ${
                theme === 'dark'
                  ? 'bg-gray-700 shadow-xl shadow-gray-900/70 border-gray-500'
                  : 'bg-white shadow-xl shadow-gray-300/70 border-gray-300'
              } transition-colors duration-200`}
              style={{ width, height }}
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                  }}
                  className={`p-1.5 rounded-md ${
                    theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                  } text-white shadow-lg`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleMoveMode();
                  }}
                  className={`p-1.5 rounded-md ${
                    moveMode || isCtrlPressed
                      ? theme === 'dark'
                        ? 'bg-blue-600'
                        : 'bg-blue-500'
                      : theme === 'dark'
                        ? 'bg-gray-600'
                        : 'bg-gray-300'
                  } text-white shadow-lg cursor-move transition-colors`}
                >
                  <Move size={14} />
                </button>
              </div>
              <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                {isEditingTitle ? (
                  <form onSubmit={handleTitleSubmit}>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onBlur={() => {
                        onTitleChange(id, newTitle);
                        setIsEditingTitle(false);
                      }}
                      className={`text-center px-2 py-1 border rounded text-sm w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                      autoFocus
                    />
                  </form>
                ) : (
                  <div
                    className="text-center text-xs mt-2 cursor-text"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {title}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};