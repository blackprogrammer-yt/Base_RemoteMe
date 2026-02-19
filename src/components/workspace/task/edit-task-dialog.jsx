import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditTaskForm from "./edit-task-form";

const EditTaskDialog = ({ task, isOpen, onClose }) => {
    return (
        <Dialog modal open={isOpen} onOpenChange={onClose}>
            <DialogContent className="my-5 max-h-auto border-0 sm:max-w-lg">
                <EditTaskForm task={task} onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDialog;
