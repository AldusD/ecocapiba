import {
  HistorySection,
  HistoryTitle,
  HistoryList,
  HistoryItem,
  ActionIcon,
  ActionInfo,
  ActionMeta,
  ActionValue,
} from "../styles";

export default function CapibasHistory({ items = [] }) {
  return (
    <HistorySection>
      <HistoryTitle>Ações anteriores</HistoryTitle>
      <HistoryList>
        {items.map((item) => (
          <HistoryItem key={item.title}>
            <ActionInfo>
              <ActionIcon aria-hidden="true">♻</ActionIcon>
              <div>
                <h3>{item.title}</h3>
                <span className="date">{item.date}</span>
              </div>
            </ActionInfo>
            <ActionMeta>
              <ActionValue>+{item.amount}</ActionValue>
              <span className="label">Capibas</span>
            </ActionMeta>
          </HistoryItem>
        ))}
      </HistoryList>
    </HistorySection>
  );
}
