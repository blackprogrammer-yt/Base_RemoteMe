import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateProjectForm from "@/components/workspace/project/create-project-form";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";

const CreateProjectDialog = () => {
    const { open, onClose } = useCreateProjectDialog();

    return (
        <div>
            <Dialog modal open={open} onOpenChange={onClose}>
                <DialogContent className="border-0 sm:max-w-lg">
                    <CreateProjectForm onClose={onClose} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateProjectDialog;
