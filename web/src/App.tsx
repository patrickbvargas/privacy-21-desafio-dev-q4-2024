import { GlobalProvider } from '@/providers';
import { BrowserRouter } from 'react-router-dom';
import { Container, Header, Content } from '@/layouts';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Container>
          <Header />
          <Content />
        </Container>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
