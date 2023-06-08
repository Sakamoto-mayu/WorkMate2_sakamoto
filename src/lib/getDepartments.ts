// departmentテーブルからデータを取得する

export const getDepartments = async () => {
    const response = await fetch(`http://localhost:8000/GetDepartmentData`);
    const departmentData = await response.json();
    // console.log(departmentData);
    return departmentData;
}
