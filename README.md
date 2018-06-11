# 项目总结

 1. 这是典型通集团长城宽带项目,项目主要使用vue框架结合vuex,vue-router及element-ui的应用  
 
 2. 基于官方的vue-cli脚手架,并在vue-cli 的基础上对脚手架进行自定义配置, 比如:

    * 加了一个 alias:{
        "@":path.resolve("src")
    } 

 3. 搭建路由
    {
        routes:[
            {
                name:'',
                path:'',
                component:Home,
                children:[
                    {
                        name:'',
                        path:'',
                        component:Login
                    }
                ]
            }
        ]
    }

 4. 代表性模块
    使用elementui:表格,弹窗dialog,登录

 5. 遇到的问题
    elementui原生组件跟原型不够相符,所以进行自定义封装修改
    elementui分页器@current-change的点击当前页时使用@size-change是每页条数别用混了 el-table中有个data属性是绑定数据
    使用vuex管理数据 参数mutations可以修改state的值,其他参数不可修改state,vuex中map映射函数需调用
    vuex中获取数据时数据最好放在静态文件夹下,有时可能会报路径的错误
    
