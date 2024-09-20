import './HomePage.css';
import { Typography, List, ListItem, ListItemIcon } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import ArchiveIcon from '@mui/icons-material/Archive';
import CategoryIcon from '@mui/icons-material/Category';

const Home = () => {
    return (
        <div className="home-container">
            <Typography variant="h4" component="h1" gutterBottom>
                Kütüphane Uygulamasına Hoşgeldiniz!
            </Typography>


            <div className='greeting'>
                <span>Bu sistem sayesinde aşağıdaki işlemleri kolaylıkla gerçekleştirebilirsiniz:</span>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <span>Yazarlar ve yayınevlerinin bilgilerini yönetme</span>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <span>Kitaplar ve ödünç alanların kayıtlarını tutma</span>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ArchiveIcon />
                        </ListItemIcon>
                        <span>Kitapların ödünç alma ve iade süreçlerini takip etme</span>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <span>Kitap kategorilerini düzenleme</span>
                    </ListItem>
                </List>
            </div>

            <Typography variant="h6">
                İşlemlerinizi menü bölümünden gerçekleştirebilirsiniz.
            </Typography>
        </div>
    );
};

export default Home;

