import React, { useState, useRef, useEffect } from "react";
import { X, SquarePen, Info, Pencil, Keyboard, Upload, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

const SignDocument = ({ open, onOpenChange }) => {
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [signType, setSignType] = useState("draw"); // 'draw' or 'type'
    const [typedSignature, setTypedSignature] = useState("");
    const [typedFont, setTypedFont] = useState("Pacifico");
    const [isSigned, setIsSigned] = useState(false);
    const [signatureImage, setSignatureImage] = useState(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!open) {
            setShowSignaturePad(false);
            setSignType("draw");
            setTypedSignature("");
            setTypedFont("Pacifico");
            setIsSigned(false);
            setSignatureImage(null);
        }
    }, [open]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const context = canvas.getContext("2d");
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Draw image to fit canvas while maintaining aspect ratio
                    const hRatio = canvas.width / img.width;
                    const vRatio = canvas.height / img.height;
                    const ratio = Math.min(hRatio, vRatio);
                    const centerShift_x = (canvas.width - img.width * ratio) / 2;
                    const centerShift_y = (canvas.height - img.height * ratio) / 2;
                    
                    context.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                };
                img.src = event.target?.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveSignature = () => {
        if (signType === "type") {
            if (!typedSignature.trim()) {
                alert("Please type your signature first.");
                return;
            }

            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = 800;
            tempCanvas.height = 200;
            const tempContext = tempCanvas.getContext("2d");

            tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            tempContext.fillStyle = "#111827";
            tempContext.textAlign = "center";
            tempContext.textBaseline = "middle";
            tempContext.font = `64px ${typedFont}, cursive`;
            tempContext.fillText(typedSignature.trim(), tempCanvas.width / 2, tempCanvas.height / 2);

            const dataUrl = tempCanvas.toDataURL();
            setSignatureImage(dataUrl);
            setIsSigned(true);
            setShowSignaturePad(false);
            return;
        }

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            // Check if canvas is empty before saving
            const context = canvas.getContext("2d");
            const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            const isCanvasEmpty = !pixelData.some(channel => channel !== 0);

            if (!isCanvasEmpty) {
                const dataUrl = canvas.toDataURL();
                setSignatureImage(dataUrl);
                setIsSigned(true);
                setShowSignaturePad(false);
            } else {
                alert("Please draw your signature first.");
            }
        }
    };

    // Canvas drawing logic
    useEffect(() => {
        if (showSignaturePad && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.lineCap = "round";
        }
    }, [showSignaturePad]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        const context = canvas.getContext("2d");
        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        const context = canvas.getContext("2d");
        context.lineTo(x, y);
        context.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        if (signType === "type") {
            setTypedSignature("");
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-white">
                {/* Header Section */}
                <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <SquarePen className="w-5 h-5 text-slate-500" />
                            <DialogTitle className="text-lg font-semibold text-slate-800">
                                Sign Document: Employee Contract
                            </DialogTitle>
                        </div>
                        <p className="text-xs text-slate-400">
                            Progress: {isSigned ? "1/1" : "0/1"} signatures completed - {isSigned ? "All signatures captured" : "Click on signature buttons to sign"}
                        </p>
                    </div>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                            <X className="w-5 h-5" />
                        </Button>
                    </DialogClose>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-8 relative bg-slate-50/30 flex flex-col">
                    {!showSignaturePad ? (
                        /* Document View */
                        <div className="max-w-3xl mx-auto bg-white shadow-sm border p-12 min-h-full space-y-8 text-center relative w-full">
                            {/* Logo */}
                            <div className="flex justify-center mb-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-[#1a9ad4] text-4xl font-bold">Guru</span>
                                    <span className="text-slate-600 text-4xl font-bold">Group</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800">
                                Public Holiday Calendar for the Year of 2024
                            </h3>

                            {/* Holiday Table */}
                            <div className="overflow-hidden border rounded-sm border-slate-200">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-[#1a5f7a] text-white">
                                            <th className="py-3 px-4 font-bold border-r border-slate-600 w-1/3">Holiday</th>
                                            <th className="py-3 px-4 font-bold border-r border-slate-600 w-1/3">Date</th>
                                            <th className="py-3 px-4 font-bold">Weekday</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-700">
                                        <tr className="bg-[#e3f2fd] border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200">New Year's Day</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Jan 01</td>
                                            <td className="py-2.5 px-4">Monday</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200 text-[#1a5f7a] font-medium italic">Eid-ul-Fitr**</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Apr 10 - Apr 11</td>
                                            <td className="py-2.5 px-4">Wednesday - Thursday</td>
                                        </tr>
                                        <tr className="bg-[#e3f2fd] border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200 text-[#1a5f7a] font-medium italic">Eid-ul-Azha**</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Jun 17 - Jun 18</td>
                                            <td className="py-2.5 px-4">Monday - Tuesday</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200 text-[#1a5f7a] font-medium italic">Ashura (Two days)**</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Jul 16 - Jul 17</td>
                                            <td className="py-2.5 px-4">Tuesday - Wednesday</td>
                                        </tr>
                                        <tr className="bg-[#e3f2fd] border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200">Pakistan's Independence Day</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Aug 14</td>
                                            <td className="py-2.5 px-4">Wednesday</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200 text-[#1a5f7a] font-medium italic">Eid Milad un - Nabi**</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Sep 16</td>
                                            <td className="py-2.5 px-4">Monday</td>
                                        </tr>
                                        <tr className="bg-[#e3f2fd] border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200">Thanksgiving Day</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Nov 28</td>
                                            <td className="py-2.5 px-4">Thursday</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2.5 px-4 border-r border-slate-200">Quaid e Azam Day / Christmas Day</td>
                                            <td className="py-2.5 px-4 border-r border-slate-200">Dec 25</td>
                                            <td className="py-2.5 px-4">Wednesday</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="relative mt-8 min-h-[120px]">
                                <div className="text-left text-[11px] text-slate-500 italic">
                                    **Tentative depends on moon sighting
                                </div>

                                {/* Signature/Button Section */}
                                 <div className="flex flex-col items-start pt-12 relative min-h-[150px]">
                                     {isSigned && (
                                         <div className="relative mb-4">
                                             <img 
                                                 src={signatureImage} 
                                                 alt="Signature" 
                                                 className="h-20 object-contain -rotate-6 transform translate-x-4" 
                                             />
                                         </div>
                                     )}
                                     <div className="absolute top-0 right-0 z-20">
                                         <Button 
                                             onClick={() => setShowSignaturePad(true)}
                                             className="bg-black hover:bg-slate-800 text-white px-6 py-6 rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.4)] flex items-center gap-2 font-semibold transition-all hover:scale-105 active:scale-95"
                                         >
                                             <SquarePen className="w-5 h-5" />
                                             Sign Here (1)
                                         </Button>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    ) : (
                        /* Signature Pad View (Image 1) */
                        <div className="max-w-2xl mx-auto w-full space-y-6">
                            {/* Info Box */}
                            <div className="bg-white border border-slate-200 p-3 rounded-md flex items-center gap-3">
                                <div className="p-1 bg-slate-200 rounded-full text-black">
                                    <Info className="w-4 h-4" />
                                </div>
                                <span className="text-black text-sm font-medium">
                                    Signing position 1 of 1
                                </span>
                            </div>

                            {/* Signature Interface Card */}
                            <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
                                {/* Tabs */}
                                <div className="flex border-b">
                                    <button 
                                        onClick={() => setSignType("draw")}
                                        className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${signType === "draw" ? "text-slate-800 border-b-2 border-slate-800" : "text-slate-400 hover:text-slate-600"}`}
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Draw
                                    </button>
                                    <button 
                                        onClick={() => setSignType("type")}
                                        className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${signType === "type" ? "text-black border-b-2 border-black" : "text-slate-400 hover:text-slate-600"}`}
                                    >
                                        <Keyboard className="w-4 h-4" />
                                        Type
                                    </button>
                                </div>

                                <div className="p-8 space-y-6">
                                    {signType === "draw" ? (
                                        <>
                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                                <Button 
                                                    onClick={handleUploadClick}
                                                    className="bg-black hover:bg-slate-800 text-white flex items-center gap-2 h-10 px-4">
                                                    <Pencil className="w-4 h-4" />
                                                    Draw Signature
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={handleUploadClick}
                                                    className="border-black text-black hover:bg-slate-100 flex items-center gap-2 h-10 px-4"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Upload Signature
                                                </Button>
                                            </div>

                                            {/* Signature Canvas Area */}
                                            <div className="border border-slate-200 rounded-md bg-white h-64 flex flex-col relative overflow-hidden group">
                                                <canvas
                                                    ref={canvasRef}
                                                    width={800}
                                                    height={200}
                                                    onMouseDown={startDrawing}
                                                    onMouseMove={draw}
                                                    onMouseUp={stopDrawing}
                                                    onMouseLeave={stopDrawing}
                                                    onTouchStart={startDrawing}
                                                    onTouchMove={draw}
                                                    onTouchEnd={stopDrawing}
                                                    className="flex-1 cursor-crosshair touch-none"
                                                />
                                                <div className="border-t border-slate-100 p-2 text-center text-slate-400 text-xs bg-slate-50/50">
                                                    Draw your signature above
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                <label className="text-sm font-medium text-slate-700">Type your signature</label>
                                                <Input
                                                    value={typedSignature}
                                                    onChange={(e) => setTypedSignature(e.target.value)}
                                                    placeholder="Enter full name"
                                                    className="h-11"
                                                />
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {[
                                                        { label: "Handwritten", value: "Pacifico" },
                                                        { label: "Script", value: "Dancing Script" },
                                                        { label: "Elegant", value: "Great Vibes" },
                                                    ].map((font) => (
                                                        <Button
                                                            key={font.value}
                                                            type="button"
                                                            variant={typedFont === font.value ? "default" : "outline"}
                                                            onClick={() => setTypedFont(font.value)}
                                                            className={typedFont === font.value ? "bg-black hover:bg-slate-800 text-white" : ""}
                                                        >
                                                            {font.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border border-slate-200 rounded-md bg-white h-64 flex flex-col relative overflow-hidden">
                                                <div className="flex-1 flex items-center justify-center px-4">
                                                    <p
                                                        className="text-5xl text-slate-800 text-center break-words"
                                                        style={{ fontFamily: `${typedFont}, cursive` }}
                                                    >
                                                        {typedSignature || "Your signature preview"}
                                                    </p>
                                                </div>
                                                <div className="border-t border-slate-100 p-2 text-center text-slate-400 text-xs bg-slate-50/50">
                                                    Typed signature preview
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Pad Footer Buttons */}
                                    <div className="flex items-center justify-center gap-3 pt-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => setShowSignaturePad(false)}
                                            className="border-black text-black hover:bg-slate-100 h-10 px-6"
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            onClick={clearCanvas}
                                            className="bg-[#ffc107] border-[#ffc107] text-white hover:bg-[#ffb300] h-10 px-6 flex items-center gap-2"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Clear
                                        </Button>
                                        <Button 
                                            onClick={handleSaveSignature}
                                            className="bg-black hover:bg-slate-800 text-white h-10 px-6 flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            Save Signature
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t flex justify-start bg-white sticky bottom-0 z-10">
                    <DialogClose asChild>
                        <Button variant="outline" className="border-black text-black hover:bg-slate-100 px-6 h-10 flex items-center gap-2">
                            <X className="w-4 h-4" />
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SignDocument;
