<template>
<div>
    <el-form :model="basicInfoData" label-width="180px">
        <el-row type="flex">
            <el-form-item label="统一社会信用代码">
                <el-input v-model="basicInfoData.creditCode"></el-input>
            </el-form-item>

            <el-form-item label="组织机构代码">
                <el-input v-model="basicInfoData.organizationCode"></el-input>
            </el-form-item>
        </el-row>

        <el-row type="flex">
            <el-form-item label="企业名称">
                <el-input v-model="basicInfoData.name"></el-input>
            </el-form-item>
        </el-row>

        <el-row type="flex">
            <el-form-item label="所在市县">
                <el-input v-model="basicInfoData.city"></el-input>
            </el-form-item>

            <el-form-item label="法定代表人">
                <el-input v-model="basicInfoData.legalRepresentative"></el-input>
            </el-form-item>
        </el-row>
    </el-form>
</div>
</template>

<script>
export default {
    props:['basicInfoData']
}
</script>
