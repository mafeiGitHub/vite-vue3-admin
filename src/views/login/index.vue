<template>
  <div class="login-container">
    <el-form 
      ref="loginFormRef" 
      :model="loginForm" 
      :rules="loginRules" 
      class="login-form" 
      autocomplete="on"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      
      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          autocomplete="username"
        />
      </el-form-item>
      
      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon>
            <Lock />
          </el-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="密码"
          name="password"
          autocomplete="current-password"
        />
        <span class="svg-container password-toggle" @click="passwordVisible = !passwordVisible">
          <el-icon>
            <component :is="passwordVisible ? 'View' : 'Hide'" />
          </el-icon>
        </span>
      </el-form-item>

      <div class="remember-container">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <el-link type="primary" :underline="false">忘记密码?</el-link>
      </div>

      <el-button 
        :loading="loading" 
        type="primary" 
        class="login-button" 
        @click="handleLogin"
      >
        {{ loading ? '登录中...' : '登 录' }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 表单引用
const loginFormRef = ref(null)
// 路由
const router = useRouter()

// 状态
const passwordVisible = ref(false)
const loading = ref(false)
const rememberMe = ref(false)

// 表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 登录方法
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      
      // 模拟登录API调用
      setTimeout(() => {
        // 这里替换为实际登录API调用
        if (loginForm.username === 'admin' && loginForm.password === '123456') {
          ElMessage.success('登录成功')
          
          // 保存token到localStorage
          localStorage.setItem('token', 'mock-token')
          
          // 跳转到首页
          router.push({ path: '/' })
        } else {
          ElMessage.error('用户名或密码错误')
        }
        loading.value = false
      }, 1000)
    } else {
      ElMessage.warning('请正确填写登录信息')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
    width: 30px;
    text-align: center;
  }

  .password-toggle {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 14px; // 调整垂直位置使其居中
    font-size: 16px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px;
      text-align: center;
      font-weight: bold;
    }
  }

  .remember-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    color: $light_gray;
    
    :deep(.el-checkbox__label) {
      color: $light_gray;
    }
  }

  .login-button {
    width: 100%;
    margin-bottom: 30px;
    font-size: 16px;
    height: 45px;
  }
}

/* 表单项样式 */
:deep(.el-form-item) {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

/* 输入框容器样式 */
:deep(.el-form-item__content) {
  display: flex;
  align-items: center;
  flex: 1;
}

/* 输入框样式 */
:deep(.el-input) {
  flex: 1; // 使用flex布局让输入框自动填充可用空间
  height: 47px;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: none !important; // 强制移除focus时的阴影
  padding: 0;
  width: 100%;
}

:deep(.el-input__inner) {
  background: transparent;
  border: 0;
  -webkit-appearance: none;
  appearance: none; /* 添加标准属性 */
  border-radius: 0;
  padding: 12px 5px 12px 15px;
  color: $light_gray;
  height: 47px;
  caret-color: $cursor;
  width: 100%;
  
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px $bg inset !important;
    -webkit-text-fill-color: $cursor !important;
  }
}

/* 针对密码框特殊处理 */
.el-form-item:has([name="password"]) {
  position: relative;
  
  /* 为密码框末尾的图标留出空间 */
  :deep(.el-input__wrapper) {
    padding-right: 40px;
  }
}
</style>