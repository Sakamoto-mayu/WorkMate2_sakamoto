export const getRole = async () => {
    const response = await fetch(`http://localhost:8000/GetRoleData`);
    const roleData = await response.json();
    // console.log(departmentData);
    return roleData;
}
