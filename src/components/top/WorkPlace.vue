<template>
    <div class="wrap">
        <table border="1" style="border-collapse: collapse" class="content">
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
                            <select name="workPlace" id="workPlace" style="width: 400px;">
                                <option value="株式会社ラクスパートナーズRP 社内業務">株式会社ラクスパートナーズRP 社内業務</option>
                            </select>
                        </td>
                    </div>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.title {
    text-align: left;
    padding: 0 5px;
}

.content {
    width: 500px;
}

thead tr th {
    border-right: none;
}

.workPlace th {
    padding: 0 5px;
}

.workPlace td {
    width: 400px;
    padding: 0 5px;
}

</style>
