import md5 from 'md5';
import { useTranslation } from 'react-i18next';
import {
  AiFillCaretDown,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineShop,
  AiOutlineUser,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { useAuthQuery } from '@/queries/queries';
import { Button, Dropdown, Skeleton } from '@/shared/components';
import { config } from '@/shared/constants/config';

export default function AppHeader() {
  const { t } = useTranslation();
  const { data: user, isLoading } = useAuthQuery();
  const avatarHash = user ? md5(user.id) : '';
  const avatarUrl =
    'https://www.gravatar.com/avatar/' + avatarHash + '?d=identicon';

  return (
    <div className="bg-white shadow">
      <div className="h-[60px] container mx-auto flex items-center">
        <Link to="/">
          <img className="w-[130px]" src="/images/logo.png" alt="logo" />
        </Link>
        <div className="flex-grow"></div>
        {isLoading ? (
          <Skeleton className="w-[100px] h-[32px]" />
        ) : user ? (
          <Dropdown
            placement="bottomRight"
            overlay={
              <>
                <div className="px-4 py-2 flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={avatarUrl}
                    alt=""
                  />
                  <div>
                    <div>@{user.username}</div>
                    <p className="text-xs font-semibold">{user.email}</p>
                  </div>
                </div>
                <hr />
                <ul className="">
                  <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-colors">
                    <AiOutlineUser />
                    Profile
                  </li>
                  <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-colors">
                    <AiOutlineShop />
                    Shop
                  </li>
                  <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-colors">
                    <AiOutlineSetting />
                    Settings
                  </li>
                </ul>
                <hr />
                <div className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-colors">
                  <AiOutlineLogout />
                  Logout
                </div>
              </>
            }
          >
            <Button variant="text">
              <img className="w-6 h-6 rounded-full" src={avatarUrl} alt="" />
              <span className="font-semibold">{user?.username}</span>
              <AiFillCaretDown className="text-gray-500" />
            </Button>
          </Dropdown>
        ) : (
          <div className="flex gap-3">
            <a href={config.api.baseUrl + '/login?return_url=%2Fa'}>
              <Button outlined>{t('log_in')}</Button>
            </a>
            <a href={config.api.baseUrl + '/register'}>
              <Button>{t('sign_up')}</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
