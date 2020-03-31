const menuList = [
    {
        title: '首页',    //菜单标题
        key: '/home',   //菜单路径
        icon: 'icon-tuichu'    //图标
    },
    {
        title: '商品',
        key: '/products',
        icon: 'icon-tuichu',
        children: [     //子菜单
            {
                title: '品类管理',
                key: '/category',
                icon: 'icon-tuichu'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'icon-tuichu'
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'icon-tuichu'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'icon-tuichu'
    },
    {
        title: '图表图形',
        key: '/charts',
        icon: 'icon-tuichu',
        children: [
            {
                title: '柱状图',
                key: '/charts/bar',
                icon: 'icon-tuichu'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'icon-tuichu'
            },
            {
                title: '饼状图',
                key: '/charts/pie',
                icon: 'icon-tuichu'
            }
        ]
    }
]

export default menuList;