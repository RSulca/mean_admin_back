const getMenu = (role = 'USER_ROLE') => {
    const menu = [{
            title: 'Main',
            icon: 'fa fa-power-off',
            submenu: [
                { title: 'Dashboard', url: '/' },
                { title: 'Promesas', url: 'promises' }
            ]
        },
        {
            title: 'Maintenance',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'User', url: 'user' },
                { title: 'Hospital', url: 'hospital' },
                { title: 'Doctor', url: 'doctor' }
            ]
        }
    ];
    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'User', url: 'user' })
    }
    return menu;
}

module.exports = {
    getMenu
}