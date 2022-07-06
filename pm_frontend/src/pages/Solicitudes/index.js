import { ReportContextProvider } from 'context/ReportContext';
import DrawScreen from './DrawScreen';


export default function Solicitudes() {
  return (
    <ReportContextProvider>
      <DrawScreen />
    </ReportContextProvider>
  );
}
