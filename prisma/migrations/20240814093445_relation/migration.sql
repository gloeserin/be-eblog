-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_article_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
