import {ref} from "vue";

interface User {
    password: string;
    email: string
}

interface Rules {
    password: ({
        trigger: string;
        message: string;
        required: string
    } | {
        min: number;
        max: number;
        message: string
    })[];
    email: ({
        trigger: string;
        message: string;
        required: string
    } | {
        trigger: string;
        type: string;
        message: string
    })[];
}

export const loginUser = ref<User>({
    email: "",
    password: ""
});
export const rules = ref<Rules>({
    email: [
        {
            message: "邮箱不能为空~",
            trigger: 'blur',
            required: "true"
        },
        {
            type: "email",
            message: "邮箱格式填写不正确哦~",
            trigger: 'blur'
        }],
    password: [
        {
            message: "密码不能为空~",
            trigger: 'blur',
            required: "true"
        },
        {
            min: 6,
            max: 30,
            message: "密码填写不正确~"
        }],
});

