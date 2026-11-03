import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardContainer, SectionCard, SectionTitle, CardFooter } from "./DashboardStyles";
import DashboardHabitList from "./DashboardHabitList";
import DashboardSubscriptionList from "./DashboardSubscriptionList";
import DashboardCalendar from "./DashboardCalendar";
import { Quotes } from "@/data/quotes";
import { QuotesSection } from "../../../styles/QuotesSectionStyles";

const Dashboard = () => {
  const [quote, setQuote] = useState(null);

  // Picked after mount so server and client render the same markup.
  useEffect(() => {
    setQuote(Quotes[Math.floor(Math.random() * Quotes.length)]);
  }, []);

  return (
    <>
      <QuotesSection>
        {quote && (
          <blockquote>
            {quote.quote}
            <footer>– {quote.author}</footer>
          </blockquote>
        )}
      </QuotesSection>

      <DashboardContainer>
        <SectionCard>
          <SectionTitle>Today&apos;s habits</SectionTitle>
          <DashboardHabitList />
          <CardFooter>
            <Link href="/habits">All habits →</Link>
          </CardFooter>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Upcoming renewals</SectionTitle>
          <DashboardSubscriptionList />
          <CardFooter>
            <Link href="/subscriptions">All subscriptions →</Link>
          </CardFooter>
        </SectionCard>

        <SectionCard>
          <DashboardCalendar />
        </SectionCard>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
