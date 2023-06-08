// attendance_typesテーブルからデータを取得する（prisma用）
export const getStatusName = async () => {
    try {
    const response = await fetch(`http://localhost:8000/GetAttendanceType`)
    const attendanceType = await response.json()
    // console.log(attendanceType);
    return attendanceType;
    } catch (error) {
        console.log(error);
    }
}
