"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Folder, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function FolderList({
  folders,
  activeFolder,
  setActiveFolder,
  editFolder,
  deleteFolder,
  todoCount,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleEdit = (id) => {
    const trimmedName = editName.trim();
    if (!trimmedName) return;

    editFolder(id, trimmedName);
    setEditingId(null);
  };

  const getFolderCount = (folderId) => {
    const folder = todoCount.find((f) => f.id === folderId);
    return folder ? folder.count : 0;
  };

  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {folders.map((folder) => (
          <motion.li
            key={folder.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Card
              className={`border-l-4 ${
                activeFolder === folder.id
                  ? "border-l-primary"
                  : "border-l-transparent"
              }`}
              onClick={() => setActiveFolder(folder.id)}
            >
              <div className="p-3">
                {editingId === folder.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 h-8 text-sm"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(folder.id);
                      }}
                    >
                      <Check size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(null);
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder
                        size={16}
                        className={
                          activeFolder === folder.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      />
                      <span
                        className={`${
                          activeFolder === folder.id ? "font-medium" : ""
                        }`}
                      >
                        {folder.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({getFolderCount(folder.id)})
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditName(folder.name);
                          setEditingId(folder.id);
                        }}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            confirm(
                              `Are you sure you want to delete "${folder.name}" folder and all its tasks?`
                            )
                          ) {
                            deleteFolder(folder.id);
                          }
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
