import { Dialog, DialogContent } from "@/components/ui/dialog";
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog";
import WorkspaceForm from "./create-workspace-form";

const CreateWorkspaceDialog = () => {
    const { open, onClose } = useCreateWorkspaceDialog();

    return (
        <Dialog modal open={open} onOpenChange={onClose}>
            <DialogContent className="!p-0 overflow-hidden border-0 sm:max-w-5xl">
                <WorkspaceForm onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkspaceDialog;
