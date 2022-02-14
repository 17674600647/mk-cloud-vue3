import {ref} from "vue";

interface User {
    password: string;
    account: string
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
    account: ({
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
    account: "1044204713",
    password: "123456788"
});
export const rules = ref<Rules>({
    account: [
        {
            message: "邮箱/账号不能为空~",
            trigger: 'blur',
            required: "true"
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

