<template>
    <table border="1" style="border-collapse: collapse">
        <thead>
            <tr>
                <th class="title">就業先設定</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <div class="workPlace">
                    <th>
                        <label for="workPlace">就業先</label>
                    </th>
                    <td>
                        <select name="workPlace" id="workPlace">
                            <option value="株式会社ラクスパートナーズRP 社内業務">株式会社ラクスパートナーズRP 社内業務</option>
                        </select>
                    </td>
                </div>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.title {
    text-align: left;
    padding: 0 5px;
}

.workPlace th {
    padding: 0 5px;
    border-right: 1px solid gray;
}

.workPlace td {
    width: 400px;
    padding: 0 5px;
}

.workPlace td select {
    width: 100%;
}
</style>
