import { LoanList } from '@/pages';
import { Container, Header, Content } from '@/layouts';

function App() {
  return (
    <Container>
      <Header title="Privacy21" />
      <Content>
        {/* // TODO: implement React Router} */}
        <LoanList />
      </Content>
    </Container>
  );
}

export default App;
