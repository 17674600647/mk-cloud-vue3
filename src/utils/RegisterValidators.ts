import {ref} from "vue";

interface RegisterUser {
    password: string;
    password2: string;
    email: string;
    username: string;
    checkCode: string;
}

export const registerUser = ref<RegisterUser>({
    username: "",
    email: "",
    password: "",
    password2: "",
    checkCode: "",
});

export interface RegisterRules {
    password: ({ trigger: string; message: string; required: string } | { min: number; max: number; message: string })[];
    username: ({ trigger: string; message: string; required: string } | { min: number; max: number; trigger: string; message: string })[];
    password2: ({ trigger: string; message: string; required: string } | { min: number; max: number; message: string } | { validator: any; trigger: string })[];
    email: ({ trigger: string; message: string; required: string } | { trigger: string; type: string; message: string })[];
    checkCode: ({ trigger: string; message: string; required: string } | { min: number; max: number; message: string })[];
}

export const validatePass2 = (rule: RegisterRules, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerUser.value.password) {
        callback(new Error('两次输入的密码不一致'))
    } else {
        callback();
    }
}
export const registerRules = ref<RegisterRules>({
    username: [{
        message: "用户名(账号)不能为空~",
        trigger: 'blur',
        required: "true"
    }, {
        min: 6,
        max: 16,
        message: "长度在6~16之间~",
        trigger: 'blur'
    }],
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
            max: 18,
            message: "密码填写不正确(6-18位)~"
        }],
    checkCode: [{
        message: "验证码不能为空~",
        trigger: 'blur',
        required: "true"
    },
        {
            min: 5,
            max: 5,
            message: "请检查验证码~"
        }],
    password2: [
        {
            message: "密码不能为空~",
            trigger: 'blur',
            required: "true"
        },
        {
            min: 6,
            max: 18,
            message: "密码填写不正确(6-18位)~"
        },
        {
            validator: validatePass2,
            trigger: 'blur',
        }],
})

