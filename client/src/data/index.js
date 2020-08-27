import React from 'react';
import { Collections, Settings, Home, ExitToApp } from '@material-ui/icons';
import { useTheme } from '@material-ui/core';

export default {
    nav: {
        drawer: {
            items: [
                'Home',
                'Collection',
                'Settings',
            ],
            icons:{
                'Home': Home,
                'Collection': Collections,
                'Settings': Settings,
            },
            colors:{
                'Home': 'red',
                'Collection': 'blue',
                'Settings': 'grey',
            }
        }
    }
}
