const routes = [
    {
        path: '/auth',
        components: {
            root: ()=> import("view/auth/index")
        },
        children: [
            {
                name: "login",
                path: "login",
                components:{
                    auth: ()=> import("view/auth/login")
                }
            },
            {
                name: 'register',
                path: 'register',
                components:{
                    auth:  ()=> import('view/auth/register')
                }
            }
        ]
    },
    {
        path: '/exception',
        component: ()=>import('view/exception/index'),
        children: [
            {
                name: "notFound",
                path: "notFound",
                components: {
                    exception: ()=> import("view/exception/404")
                }
            }
        ]
    },
    {
        name: "test",
        path: "/test",
        components: {
            root: ()=> import("component/detail/iconText")
        }

    },
    {
        path: '/index',
        components:{
            root:  ()=> import('view/index/index')
        },
        children:[
            {
                name:'index',
                path:'',
                components: {
                    main: ()=> import('component/home/home')
                }
            },
            {
                name:'userManager',
                path: 'usermanager',
                components:{
                    main: () => import('component/userManager/userManager'),
                }
            },
            {
                path: 'mine',
                components:{
                    main: () =>import('component/mine/index'),
                },
                children:[{
                    name: 'mine',
                    path: '',
                    components:{
                        mine: ()=> import('component/mine/home')
                    }
                },{
                    name:'edit',
                    path:'edit',
                    components:{
                        mine: ()=>import('component/mine/edit')
                    }
                }]
            },
            {
                path:'courseManager',
                name:'courseManager',
                components:{
                    main: ()=>import('component/courseManager')
                }
            },
            {
                name: "study",
                path:'study',
                components:{
                    main: ()=> import('component/study')
                }
            }
        ]
    }
]

export default routes