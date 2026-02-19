import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskForm from "./create-task-form";

const CreateTaskDialog = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <Button>
                        <Plus />
                        New Task
                    </Button>
                </DialogTrigger>
                <DialogContent className="my-5 max-h-auto border-0 sm:max-w-lg">
                    <CreateTaskForm projectId={props.projectId} onClose={onClose} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTaskDialog;
