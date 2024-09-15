import { GlobalProvider } from '@/providers';
import { LoanList } from '@/pages';
import { Container, Header, Content } from '@/layouts';

function App() {
  return (
    <GlobalProvider>
      <Container>
        <Header title="Privacy21" />
        <Content>
          {/* // TODO: implement React Router} */}
          <LoanList />
        </Content>
      </Container>
    </GlobalProvider>
  );
}

export default App;
