import React, { createContext, useContext, useState } from 'react';

export interface PanelStyle {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    borderRadius?: number;
    fontColor?: string;
    fontSize?: number;
    fontWeight?: "normal" | "bold";
    fontStyle?: "normal" | "italic";
    textDecoration?: "none" | "underline";
    boxShadow?: string;
}

export interface Panel {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    shape: string;
    moveEnabled: boolean;
    editingEnabled: boolean;
    rotation: number;
    style: PanelStyle;
    title: string
    isLocked: boolean;
}

interface PanelContextType {
    panels: Panel[];
    addPanel: (s: string) => void;
    clearPanels: () => void;
    removePanel: (id: string) => void;
    addDuplicatePanel: (panelId: string, copiedPanel: boolean) => void
    updatePanel: (
        id: string,
        updates: Partial<Omit<Panel, "id">> & {
            style?: Partial<Panel["style"]>;
        }
    ) => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: React.ReactNode }) {

    const [panels, setPanels] = useState<Panel[]>([]);

    const addPanel = (shape: string) => {
        const canvas = document.querySelector('.canvas-container');
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const x = rect.width / 2 - 200; // Center horizontally (400 width / 2)
        const y = rect.height / 2 - 200; // Center vertically (400 height / 2)

        const maxZIndex = panels.reduce((max, p) => Math.max(max, p.zIndex), 0);

        const newPanel: Panel = {
            id: crypto.randomUUID(),
            x,
            y,
            width: shape === 'text' ? 250 : 400,
            height: (shape === 'text' || shape === 'rectangle') ? 100 : 400,
            zIndex: maxZIndex + 1,
            rotation: 0,
            moveEnabled: true,
            editingEnabled: true,
            shape,
            isLocked: false,
            title: '',
            style: {
                strokeColor: '#1e3a8a',
                strokeWidth: 1,
                borderRadius: 0,
                fillColor: 'transparent',
                fontColor: '#000000',
                fontSize: 16,
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none',
                boxShadow: '',
            },
        };

        setPanels(prev => [...prev, newPanel]);
    };



    const clearPanels = () => {
        setPanels([]);
    };

    const removePanel = (id: string) => {
        setPanels(prev => prev.filter(panel => panel.id !== id));
    };

    const updatePanel = (
        id: string,
        updates: Partial<Omit<Panel, "id">> & {
            style?: Partial<Panel["style"]>;
        }
    ) => {
        console.log(updates)
        setPanels(prev =>
            prev.map(panel =>
                panel.id === id
                    ? {
                        ...panel,
                        ...updates,
                        style: {
                            ...panel.style,
                            ...updates.style,
                        },
                    }
                    : panel
            )
        );
    };


    const addDuplicatePanel = (panelId: string, copiedPanel: boolean ) => {
        const panel = panels.find((p) => panelId === p.id);
        if (!panel) throw new Error("Panel not found");

        const baseTitle = panel.title;
        const similarPanelsCount = panels.filter(p => p.title.startsWith(baseTitle)).length;

        const offset = copiedPanel ? 10 : 20 * similarPanelsCount;

        const newPanel: Panel = {
            id: crypto.randomUUID(),
            x: panel.x + offset,
            y: panel.y + offset,
            width: panel.width,
            height: panel.height,
            zIndex: panel.zIndex + 1,
            rotation: panel.rotation,
            moveEnabled: true,
            editingEnabled: true,
            shape: panel.shape,
            isLocked: panel.isLocked,
            title: `${panel.title} Copy ${similarPanelsCount}`,
            style: {
                strokeColor: panel.style.strokeColor,
                strokeWidth: panel.style.strokeWidth,
                borderRadius: panel.style.borderRadius,
                fillColor: panel.style.fillColor,
                fontColor: panel.style.fontColor,
                fontSize: panel.style.fontSize,
                fontWeight: panel.style.fontWeight,
                fontStyle: panel.style.fontStyle,
                textDecoration: panel.style.textDecoration,
                boxShadow: panel.style.boxShadow,
            },
        };

        setPanels(prev => [...prev, newPanel]);
    };






    return (
        <PanelContext.Provider value={{ panels, addPanel, clearPanels, removePanel, updatePanel, addDuplicatePanel }} >{children}</PanelContext.Provider>
    );


}

export function usePanel() {
    const context = useContext(PanelContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}