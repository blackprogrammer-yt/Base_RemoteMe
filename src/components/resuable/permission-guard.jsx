const PermissionsGuard = ({ requiredPermission, children }) => {
    void requiredPermission;
    return <>{children}</>;
};

export default PermissionsGuard;
