import { writeFileSync } from 'fs';

const content = `flowchart LR
  subgraph Actions_Workflow
    test --> docs --> deploy
  end
  subgraph Project
    src --> js[test code]
    docs --> diagrams
  end
`;

writeFileSync('docs/diagrams/system.mmd', content);
