import { useState } from "react";
import { Edit3 } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditProjectForm from "./edit-project-form";

const EditProjectDialog = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="mt-1.5" asChild>
                    <button>
                        <Edit3 className="h-5 w-5" />
                    </button>
                </DialogTrigger>
                <DialogContent className="border-0 sm:max-w-lg">
                    <EditProjectForm project={props.project} onClose={onClose} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditProjectDialog;
