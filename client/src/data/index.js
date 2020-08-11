import React from 'react';
import { AccountCircle, Collections, Settings } from '@material-ui/icons';
import { useTheme } from '@material-ui/core';

export default {
    nav: {
        drawer: {
            items: [
                // 'Profile',
                'Collection',
                'Settings',
            ],
            icons:{
                // 'Profile': AccountCircle,
                'Collection': Collections,
                'Settings': Settings
            },
            colors:{
                // 'Profile': 'purple',
                'Collection': 'blue',
                'Settings': 'grey'
            }
        }
    }
}
