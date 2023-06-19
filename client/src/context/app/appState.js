import AppContext from "./appContext";
import { themeSettings } from '../../theme';


export const AppState = ({ children }) => {
  const theme = themeSettings('light'); 
  

  return (
    <AppContext.Provider value={{ theme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
