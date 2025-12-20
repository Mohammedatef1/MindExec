import { supabase } from "../client";

export const saveMindMap = async (nodes, edges, workflowName = "Untitled Workflow", workflowId = null) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const workflowData = { nodes, edges };
    
    if (workflowId) {
      // Update existing workflow
      const { data, error } = await supabase
        .from("workflows")
        .update({
          name: workflowName,
          data: workflowData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", workflowId)
        .eq("user_id", user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      // Create new workflow
      const { data, error } = await supabase
        .from("workflows")
        .insert({
          user_id: user.id,
          name: workflowName,
          data: workflowData,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Error saving workflow:", error);
    throw error;
  }
};

export const loadMindMap = async (workflowId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .eq("id", workflowId)
      .eq("user_id", user.id)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    // Return the workflow data (nodes and edges) along with metadata
    return {
      nodes: data.data.nodes || [],
      edges: data.data.edges || [],
      workflowInfo: {
        id: data.id,
        name: data.name,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    };
  } catch (error) {
    console.error("Error loading workflow:", error);
    return null;
  }
};

export const getUserWorkflows = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("workflows")
      .select("id, name, data, created_at, updated_at, runs_count")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return [];
  }
};

export const createWorkflow = async (workflowName) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Create workflow with empty nodes and edges
    const workflowData = { nodes: [], edges: [] };
    
    const { data, error } = await supabase
      .from("workflows")
      .insert({
        user_id: user.id,
        name: workflowName,
        data: workflowData,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating workflow:", error);
    throw error;
  }
};

export const deleteWorkflow = async (workflowId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("workflows")
      .delete()
      .eq("id", workflowId)
      .eq("user_id", user.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting workflow:", error);
    throw error;
  }
};
