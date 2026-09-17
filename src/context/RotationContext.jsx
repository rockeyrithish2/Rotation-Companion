import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getRotationProgress, toggleTopicCompletion, saveUser } from '../lib/db/storage';
import { generateDailyPlan } from '../lib/ai/dailyPlan';
import { useAuth } from './AuthContext';

const RotationContext = createContext();

export function RotationProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [dailyPlan, setDailyPlan] = useState(null);
  const [completedTaskIds, setCompletedTaskIds] = useState([]);

  const refreshRotationData = useCallback(() => {
    if (!user) {
      setProgress(null);
      setDailyPlan(null);
      return;
    }
    const prog = getRotationProgress(user.id);
    setProgress(prog);
    const plan = generateDailyPlan();
    setDailyPlan(plan);
  }, [user]);

  useEffect(() => {
    refreshRotationData();
  }, [user, refreshRotationData]);

  const toggleTaskCompletion = (taskId) => {
    setCompletedTaskIds(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };

  const handleTopicToggle = (topicId) => {
    toggleTopicCompletion(topicId, user?.id);
    refreshRotationData();
  };

  const changeRotation = (rotationId, startDate, endDate) => {
    saveUser({
      currentRotationId: rotationId,
      rotationStartDate: startDate,
      rotationEndDate: endDate
    }, user?.id);
    refreshRotationData();
  };

  return (
    <RotationContext.Provider value={{
      progress,
      dailyPlan,
      completedTaskIds,
      toggleTaskCompletion,
      handleTopicToggle,
      changeRotation,
      refreshRotationData
    }}>
      {children}
    </RotationContext.Provider>
  );
}

export function useRotation() {
  return useContext(RotationContext);
}
