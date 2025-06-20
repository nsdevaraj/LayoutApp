import React, { createContext, useContext, useState } from "react";

interface CanvasSettingsContextType {
    canvasTitle : string;
    setCanvasTitle : (title : string) => void;
    canvasBgColor: string;
    setCanvasBgColor: (color: string) => void;
    canvasFgColor: string;
    canvasGradient: string
    setCanvasGradient: (gradient: string) => void;
    setCanvasFgColor: (color: string) => void;
    canvasWidth: number | null;
    setCanvasWidth: (width: number | null) => void;
    canvasHeight: number | null;
    setCanvasHeight: (height: number | null) => void;
    roundedCorners: boolean;
    setRoundedCorners: (rounded: boolean) => void;
    showGrid: boolean;
    setShowGrid: (show: boolean) => void;
    isEditingCanvas: boolean;
    toggleEdit: () => void;
    canvasPositionX: number;
    canvasPositionY: number;
    setCanvasPositionX: (x: number) => void;
    setCanvasPositionY: (y: number) => void;
    draggedPanel : string;
    setDraggedPanel : (shape : string) => void;
    showCanvasSettings : boolean;
    setShowCanvasSettings : (show : boolean) => void;
}

const CanvasSettingsContext = createContext<CanvasSettingsContextType | undefined>(undefined);

export const CanvasSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [canvasBgColor, setCanvasBgColor] = useState<string>("#ffffff");
    const [canvasFgColor, setCanvasFgColor] = useState<string>("#000000");
    const [canvasWidth, setCanvasWidth] = useState<number | null>(null);
    const [canvasHeight, setCanvasHeight] = useState<number | null>(null);
    const [roundedCorners, setRoundedCorners] = useState<boolean>(false);
    const [showGrid, setShowGrid] = useState<boolean>(false);
    const [isEditingCanvas, setIsEditingCanvas] = useState<boolean>(false);
    const [canvasPositionX, setCanvasPositionX] = useState<number>(0)
    const [canvasPositionY, setCanvasPositionY] = useState<number>(0);
    const [canvasGradient, setCanvasGradient] = useState('#fffff');
    const [canvasTitle, setCanvasTitle] = useState('My Canva');
    const [draggedPanel, setDraggedPanel] = useState('');
    const [showCanvasSettings, setShowCanvasSettings] = useState<boolean>(false);

    function toggleEdit() {
        setIsEditingCanvas(!isEditingCanvas);
    }

    return (
        <CanvasSettingsContext.Provider
            value={{
                canvasTitle,
                setCanvasTitle,
                canvasBgColor,
                setCanvasBgColor,
                setCanvasGradient,
                canvasGradient,
                canvasFgColor,
                setCanvasFgColor,
                canvasWidth,
                setCanvasWidth,
                canvasHeight,
                setCanvasHeight,
                roundedCorners,
                setRoundedCorners,
                showGrid,
                setShowGrid,
                isEditingCanvas,
                toggleEdit,
                canvasPositionX,
                canvasPositionY,
                setCanvasPositionX,
                setCanvasPositionY,
                setDraggedPanel,
                draggedPanel,
                showCanvasSettings,
                setShowCanvasSettings
            }}
        >
            {children}
        </CanvasSettingsContext.Provider>
    );
};

export const useCanvasSettings = () => {
    const context = useContext(CanvasSettingsContext);
    if (!context) {
        throw new Error("useCanvasSettingsContext must be used within a CanvasSettingsProvider");
    }
    return context;
};
