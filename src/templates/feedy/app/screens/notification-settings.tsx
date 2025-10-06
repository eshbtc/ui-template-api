import { View } from "react-native";
import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import Switch from "@/components/forms/Switch";
import { useState } from "react";

export default function NotificationSettingsScreen() {
    const [transactionAlerts, setTransactionAlerts] = useState(true);
    const [paymentReceived, setPaymentReceived] = useState(true);
    const [lowBalance, setLowBalance] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);
    const [monthlyStatement, setMonthlyStatement] = useState(false);
    const [promotions, setPromotions] = useState(false);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className="p-global">
                <Section title="Notification Settings" titleSize="4xl" className="mt-4 mb-10" />

                <Switch className="my-4" label="Likes & reactions" description="Get notified when someone likes your posts" icon="Heart" value={transactionAlerts} onChange={setTransactionAlerts} />
                <Switch className="my-4" label="Comments" description="Notifications when someone comments on your posts" icon="MessageCircle" value={paymentReceived} onChange={setPaymentReceived} />
                <Switch className="my-4" label="New followers" description="Get notified when someone follows you" icon="UserPlus" value={lowBalance} onChange={setLowBalance} />
                <Switch className="my-4" label="Mentions & tags" description="When someone mentions or tags you" icon="AtSign" value={securityAlerts} onChange={setSecurityAlerts} />
                <Switch className="my-4" label="Direct messages" description="New message notifications" icon="Mail" value={monthlyStatement} onChange={setMonthlyStatement} />
                <Switch className="my-4" label="Live notifications" description="When people you follow go live" icon="Video" value={promotions} onChange={setPromotions} />
            </ThemedScroller>
        </>
    )
}

