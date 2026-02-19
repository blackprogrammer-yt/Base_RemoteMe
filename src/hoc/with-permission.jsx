import { jsx as _jsx } from "react/jsx-runtime";
const withPermission = (WrappedComponent, requiredPermission) => {
    void requiredPermission;
    const WithPermission = (props) => (_jsx(WrappedComponent, { ...props }));
    return WithPermission;
};
export default withPermission;
