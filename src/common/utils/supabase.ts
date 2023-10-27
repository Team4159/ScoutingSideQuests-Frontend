import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase"

const supabase = createClient<Database>(
    "zcckkiwosxzupxblocff",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjY2traXdvc3h6dXB4YmxvY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4NDk3MzMsImV4cCI6MjAwMjQyNTczM30.IVIT9yIxQ9JiwbDB6v10ZI8eP7c1oQhwoWZejoODllQ"
);

const getAllAchievementNames = async (): Promise<string[] | null> => {
    const res = await supabase.from("achievements").select("name");
    
    if (res.data === null) {
        return null;
    }

    return res.data.map((achievement) => achievement.name);
}

const addAchievement = async (user: string, achievementName: string, description?: string): Promise<boolean> => {
    const res = await supabase.from("achievement_queue").insert({
        achievement: achievementName,
        description: description,
        season: process.env.SEASON,
        event: process.env.EVENT,
        user: user,
    });
    
    return res.status < 300;
}

export {
    getAllAchievementNames,
    addAchievement,
}