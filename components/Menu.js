import * as React from 'react';
import Image from 'next/image'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link'
import { useUser } from "../context/userContext";

export default function MenuGame() {
    const { user, logout } = useUser()
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container className='bg-white'>
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <Image src="/vynil.png" height={50} width={50} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Link href="/" passHref>
                                <MenuItem>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </Link>
                            <Link href="/products" passHref>
                                <MenuItem>
                                    <Typography textAlign="center">Products</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className="flex items-center w-full" >
                        <div className='w-full'>
                            <Link href="/" passHref>
                                <Button
                                    sx={{ my: 2 }}
                                >
                                    <Image src="/vynil.png" height={50} width={50} />
                                </Button>
                            </Link>
                            <Link href="/products" passHref>
                                <Button
                                    sx={{ my: 2, color: 'black', fontWeight: '900' }}
                                >
                                    VINYLES
                                </Button>
                            </Link>
                            <Link href="/messages" passHref>
                                <Button
                                    sx={{ my: 2, color: 'black', fontWeight: '900' }}
                                >
                                    COMMUNAUTE
                                </Button>
                            </Link>
                        </div>
                        {user && <Button onClick={logout} className="text-black text-right justify-self-end	">Deconnexion</Button>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};