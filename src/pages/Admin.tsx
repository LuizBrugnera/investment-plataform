import { DashboardContainer } from "../Styled";
import { Contracts } from "../components/Contracts";

function Admin() {
  return (
    <DashboardContainer>
      <Contracts admin={true} />
    </DashboardContainer>
  );
}

export default Admin;
